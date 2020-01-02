import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';

import { UserService } from "../../../core/services/user.service";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-serviceprovider-signin',
  templateUrl: './serviceprovider-signin.component.html',
  styleUrls: ['./serviceprovider-signin.component.scss']
})
export class ServiceproviderSigninComponent implements OnInit {
  signInForm: FormGroup;
  showLogin:boolean=true;
  forgotPasswordForm:FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ServiceproviderSigninComponent>,
    public dialog: MatDialog,
    private toastr: ToastrService,
    private userService: UserService,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.signInForm = this.formBuilder.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
    this.forgotPasswordForm = this.formBuilder.group({
      email:['',Validators.required],
    });
  }
  closeModal() {
    this.dialogRef.close(true);
  }

  public errorHandling = (form: FormGroup,control: string, error: string) => {
    return form.controls[control].hasError(error);
  }
  submitSigninForm() {
    console.log(this.signInForm.value)
    this.signInForm.markAllAsTouched();
      var data = {
      "Username":this.signInForm.value.userName,
      "Password":this.signInForm.value.password,
      "FcmToken":""
      }
      this.userService.userSignIn(data).subscribe(
        res => {
          console.log("Login Result==>", res);
          if(res['Status'] ==1) {
            localStorage.setItem('isLoggedin', 'true');
            localStorage.setItem('userId', res['UserID']);
            localStorage.setItem('userName', res['Username']);
            localStorage.setItem('userEmail', res['EmailID']);
            localStorage.setItem('userContact', res['Phone']);
            this.userService.loginStatus(true);
            this.dialogRef.close(true);
            this.toastr.success(res['msg'], '', {
              timeOut: 3000,
            });
          }
          else {
            this.toastr.error(res['msg'], '', {
              timeOut: 3000,
            });
          }
        },
        error => {
          console.log(error.error);
          this.toastr.error('Sorry! Please enter valid login creadentials', '', {
            timeOut: 3000,
          });
          this.spinner.hide();
        }
      )
  }
  gotoForgotPass() {
    this.showLogin =false;
  }
  forgetPass(){
    if(this.forgotPasswordForm.valid){
      this.showLogin =true;
      console.log('hi');
      
    }

  }
  backtoLogin(){
    this.showLogin =true;
  }


}

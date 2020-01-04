import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
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
    private router: Router,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.signInForm = this.formBuilder.group({
      providerEmail: ['',[Validators.required, Validators.email]],
      providerPassword: ['', [Validators.required, Validators.minLength(6)]],
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

    if(this.signInForm.valid) {
      console.log(this.signInForm.value)
      this.signInForm.markAllAsTouched();
        var data = {
        "providerEmail":this.signInForm.value.providerEmail,
        "providerPassword":this.signInForm.value.providerPassword,
        }
        this.userService.providerSignIn(data).subscribe(
          res => {
            console.log("Provider Login Result==>", res);
            if(res['Status'] ==1) {
              localStorage.setItem('isLoggedin', 'true');
              localStorage.setItem('userId', res['providerID']);
              localStorage.setItem('userType', '4');
              localStorage.setItem('userName', '');
              localStorage.setItem('userEmail', res['providerEmail']);
              localStorage.setItem('userContact', res['providerPassword']);
              this.userService.loginStatus(true);
              this.dialogRef.close(true);
              this.toastr.success(res['msg'], '', {
                timeOut: 3000,
              });
              this.router.navigate(['/order']);
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
    else {
      this.signInForm.markAllAsTouched();
    }
   
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

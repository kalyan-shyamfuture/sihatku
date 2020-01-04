import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from "../../../core/services/user.service";
import { MainService } from "../../../core/services/main.service";
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { PasswordValidation } from '../../../core/validation/PasswordValidation';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  showLogin:boolean=true;
  listCountry:any=[];
  signInForm: FormGroup;
  otpForm: FormGroup;
  showOtp: boolean = false;
  submitted = false;
  mobile: number;
  getOtp:any;
  signupForm: FormGroup;
  forgotPasswordForm:FormGroup;
  

  constructor(
    public dialogRef: MatDialogRef<SigninComponent>,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private mainService:MainService,
    private toastr: ToastrService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {
    dialogRef.disableClose = true;
  }

  ngOnInit() {
    this.getCountry();
    this.signInForm = this.formBuilder.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.signupForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      dob: ['', Validators.required],
      gender: ['',Validators.required],
      country: ['',Validators.required],
      email: ['',Validators.required],
      mobile: ['',Validators.required],
      password: ['',Validators.required],
      confirmPassword: ['',Validators.required],
    },
    {
      validator: PasswordValidation.MatchPassword
    }
    );
    
    this.forgotPasswordForm = this.formBuilder.group({
      email:['',Validators.required],
    });
    
  }
 


  genderList: any = [
    { id: 1, type: "Male" },
    { id: 2, type: "Female" },
    { id: 3, type: "Others" },
  ]

  closeModal() {
    this.dialogRef.close(true);
  }

  public errorHandling = (form: FormGroup,control: string, error: string) => {
    return form.controls[control].hasError(error);
  }

  getCountry() {
    this.mainService.getCountryList().subscribe(
      res => {
        console.log("Country List==>",res);
        this.listCountry = res['response']
       // console.log("List Country ==>",this.listCountry);
      },
      error => {
        console.log(error.error);
       
      }
    )
  }

  submitSigninForm() {
    //console.log(this.signInForm.);
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
            localStorage.setItem('userType', '2');
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
          this.toastr.error('Error!!!', '', {
            timeOut: 3000,
          });
          this.spinner.hide();
        }
      )
  }
  signUp(){
    console.log(this.signupForm.value)
    this.signupForm.markAllAsTouched();
      var data = {
      "FirstName":this.signupForm.value.firstName +" "+this.signupForm.value.middleName,
      "LastName":this.signupForm.value.lastName,
      "DOB":this.signupForm.value.dob,
      "Gender":this.signupForm.value.gender.toString(),
      "Country":this.signupForm.value.country.toString(),
      "EmailID":this.signupForm.value.email,
      "Phone":this.signupForm.value.mobile,
      "Password":this.signupForm.value.password,
      "Flag":1,
      }
      this.userService.userSignUp(data).subscribe(
        res => {
          console.log("Signup Result==>", res);

          if(res['Status'] ==1) {
            this.dialogRef.close(true);
          this.toastr.success(res['msg'], '', {
            timeOut: 3000,
          });
        }
        else {
          this.dialogRef.close(true);
          this.toastr.error(res['msg'], '', {
            timeOut: 3000,
          });
        }
        },
        error => {
          console.log(error.error);
          this.toastr.error('Error!!!', '', {
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

import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from "../../../core/services/user.service";
import { MainService } from "../../../core/services/main.service";
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { FormControlValidator,PasswordValidator } from "../../../core/validators";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  showModal:number=1;
  listCountry:any=[];
  signInForm: FormGroup;
  otpForm: FormGroup;
  showOtp: boolean = false;
  submitted = false;
  mobile: number;
  getOtp:any;
  signupForm: FormGroup;
  forgotPasswordForm:FormGroup;
  forgotOTPForm:FormGroup;
  changePasswordForm:FormGroup;
  getOTP:any;
  setOTP:any;
  userEmail:any;

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
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.signupForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dob: ['', Validators.required],
      gender: ['',Validators.required],
      country: ['',Validators.required],
      email: ['',[Validators.required,Validators.email]],
      mobile: ['',[Validators.required, Validators.maxLength(10)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['',Validators.required],
    },{ validator: PasswordValidator('password', 'confirmPassword') }
    );
    
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['',[Validators.required,Validators.email]],
    });
    this.forgotOTPForm = this.formBuilder.group({
      otp: ['',Validators.required],
    });
    this.changePasswordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['',Validators.required],
    },{ validator: PasswordValidator('password', 'confirmPassword') });
  }

  get signinControls() {
    return this.signInForm.controls;
  }
  get signupControls() {
    return this.signupForm.controls;
  }
  get forgotPasswordControls() {
    return this.forgotPasswordForm.controls;
  }
  get forgotOTPControls() {
    return this.forgotOTPForm.controls;
  }
  get changePasswordControls() {
    return this.changePasswordForm.controls;
  }
  errorState(field, validatorFieldName) {
    return FormControlValidator(field, validatorFieldName);
  }
 
  genderList: any = [
    { id: 1, type: "Male" },
    { id: 2, type: "Female" },
    { id: 3, type: "Others" },
  ]

  closeModal() {
    this.dialogRef.close(true);
  }


  getCountry() {
    this.mainService.getCountryList().subscribe(
      res => {
        this.listCountry = res['response']
      },
      error => {
        console.log(error.error);
      }
    )
  }

  signIn() {
    if(this.signInForm.valid) {
      this.signInForm.markAllAsTouched();
        var data = {
        "Username":this.signInForm.value.email,
        "Password":this.signInForm.value.password,
        "FcmToken":""
        }
        this.userService.userSignIn(data).subscribe(
          res => {
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
  
  }
  signUp(){
    this.signupForm.markAllAsTouched();
      var data = {
      "FirstName":this.signupForm.value.firstName,
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
    this.showModal =2;
  }
  forgetPass(){
    if(this.forgotPasswordForm.valid){
      this.forgotPasswordForm.markAllAsTouched();
      this.userEmail = this.forgotPasswordForm.value.email;
        var data = {
        "emailid":this.forgotPasswordForm.value.email,
        "Flag":"1",
        }
        this.userService.userForgotPassword(data).subscribe(
          res => {
            console.log("Forgot pass Result==>", res);
            if(res['status']==1) {
              if(res['response'][0]['Status']==1) {
                this.showModal =3;
                this.getOTP = res['response'][0]['OTP'];
                this.toastr.success("Your OTP is : "+this.getOTP, '', {
                  timeOut: 4000,
                });
              }
              else {
                this.toastr.warning(res['response'][0]['msg'], '', {
                  timeOut: 4000,
                });
              }
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

  }

  otpMatch() {
    if(this.forgotOTPForm.valid){
      this.setOTP = this.forgotOTPForm.value.otp;
      if(this.getOTP == this.setOTP) {
        this.showModal =4;
      }
      else {
        this.toastr.error('OTP Mismatch!!!', '', {
          timeOut: 3000,
        });
      }
    }
  }

  updatePassword() {
    if(this.changePasswordForm.valid){
      var data = {
        "emailid":this.userEmail,
        "Flag":"2",
        "OTP":this.setOTP,
        "password":this.changePasswordForm.value.password
      }
        this.userService.userForgotPassword(data).subscribe(
      res => {
        console.log("Forgot pass Result==>", res);
        if(res['status']==1) {
         
          this.showModal =1;
          this.toastr.success(res['response'][0]['msg'], '', {
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
  }

  backtoLogin(){
    this.showModal =1;
  }

 
    
}

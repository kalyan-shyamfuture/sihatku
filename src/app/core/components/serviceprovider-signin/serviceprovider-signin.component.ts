import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserService } from "../../../core/services/user.service";
import { NgxSpinnerService } from "ngx-spinner";
import { FormControlValidator,PasswordValidator } from "../../../core/validators";

@Component({
  selector: 'app-serviceprovider-signin',
  templateUrl: './serviceprovider-signin.component.html',
  styleUrls: ['./serviceprovider-signin.component.scss']
})
export class ServiceproviderSigninComponent implements OnInit {
  signInForm: FormGroup;
  showModal:number=1;
  forgotPasswordForm:FormGroup;
  forgotOTPForm:FormGroup;
  changePasswordForm:FormGroup;
  getOTP:any;
  setOTP:any;
  userEmail:any;
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
      email: ['',[Validators.required, Validators.email]],
    });
    this.forgotOTPForm = this.formBuilder.group({
      otp:['',Validators.required],
    });
    // this.changePasswordForm = this.formBuilder.group({
    //   password:['',Validators.required],
    // });
    this.changePasswordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['',Validators.required],
    },{ validator: PasswordValidator('password', 'confirmPassword') });
  }
  closeModal() {
    this.dialogRef.close(true);
  }

  get signinControls() {
    return this.signInForm.controls;
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
            if(res['response'][0]['Status'] ==1) {
              localStorage.setItem('isLoggedin', 'true');
              localStorage.setItem('userId', res['response'][0]['providerID']);
              localStorage.setItem('userType', '4');
              localStorage.setItem('userName', res['response'][0]['ClinicName']);
              localStorage.setItem('userEmail', res['response'][0]['providerEmail']);
             // localStorage.setItem('userContact', res['response'][0]['providerPassword']);
              this.userService.loginStatus(true);
              this.dialogRef.close(true);
              this.toastr.success(res['response'][0]['msg'], '', {
                timeOut: 3000,
              });
              this.router.navigate(['/dashboard']);
            }
            else {
              this.toastr.error(res['response'][0]['msg'], '', {
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
    this.showModal =2;
  }
  forgetPass(){
    if(this.forgotPasswordForm.valid){
      console.log(this.forgotPasswordForm.value);
      this.signInForm.markAllAsTouched();
      this.userEmail = this.forgotPasswordForm.value.email;
        var data = {
        "emailid":this.forgotPasswordForm.value.email,
        "Flag":"1",
        }
        this.userService.providerForgotPassword(data).subscribe(
          res => {
            console.log("Forgot pass Result==>", res);
            if(res['status']==1) {
              if(res['response'][0]['Status']==1) {
                this.showModal =3;
                this.getOTP = res['response'][0]['OTP'];
                this.toastr.success("Your OTP is : "+this.getOTP, '', {
                  timeOut: 4000,
                });
              console.log(this.getOTP);
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
  backtoLogin(){
    this.showModal =1;
  }

  otpMatch() {
    if(this.forgotOTPForm.valid){
      console.log(this.forgotOTPForm.value);
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
    else {
      this.toastr.error('OTP Mismatch!!!', '', {
        timeOut: 3000,
      });
    }
  }

  updatePassword() {
    if(this.changePasswordForm.valid){
      console.log(this.changePasswordForm.value);
      var data = {
        "emailid":this.userEmail,
        "Flag":"2",
        "OTP":this.setOTP,
        "password":this.changePasswordForm.value.password
      }
        this.userService.providerForgotPassword(data).subscribe(
      res => {
        console.log("Forgot pass Result==>", res);
        if(res['status']==1) {
         
          this.showModal =3;
          //this.getOTP = res['response'][0]['msg'];
          this.toastr.success(res['response'][0]['msg'], '', {
            timeOut: 4000,
          });
        console.log(this.getOTP);
        this.dialogRef.close(true);
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

  // var data = {
  //   "emailid":this.userEmail,
  //   "Flag":"2",
  //   "OTP":this.setOTP,
  //   }
  //   this.userService.providerForgotPassword(data).subscribe(
  //     res => {
  //       console.log("Forgot pass Result==>", res);
  //       if(res['status']==1) {
  //         this.showModal =3;
  //         this.getOTP = res['response'][0]['OTP'];
  //       console.log(this.getOTP);
        
  //       }
  //     },
  //     error => {
  //       console.log(error.error);
  //       this.toastr.error('Error!!!', '', {
  //         timeOut: 3000,
  //       });
  //       this.spinner.hide();
  //     }
  //   )


}

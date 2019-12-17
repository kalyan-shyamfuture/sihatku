import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from "../../../core/services/user.service";
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  signInForm: FormGroup;
  otpForm: FormGroup;
  showOtp: boolean = false;
  submitted = false;
  mobile: number;
  getOtp:any;

  constructor(
    public dialogRef: MatDialogRef<SigninComponent>,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {
    dialogRef.disableClose = true;
  }

  ngOnInit() {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
    
  }

  closeModal() {
    this.dialogRef.close(true);
  }
  // convenience getter for easy access to form fields
  get f() {
    return this.signInForm.controls;
  }
  get f1() { return this.otpForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.signInForm.invalid) {
      return;
    }
    else {

      this.spinner.show();
      console.log(this.signInForm.value);
      this.signInForm.value.device_token = "";
      // this.userService.userSignin(this.signInForm.value).subscribe(
      //   res => {
      //     console.log("Login ==>", res);
      //     if (res['result']['status'] == true) {
           
      //       this.submitted = false;
      //       this.spinner.hide();
      //     }
      //     else {
      //       this.toastr.error(res['result']['message'], '', {
      //         timeOut: 3000,
      //       });
      //       this.spinner.hide();
      //     }
      //   },
      //   error => {
      //     console.log(error.error);
      //     this.toastr.error('Sorry! Please enter valid login creadentials', '', {
      //       timeOut: 3000,
      //     });
      //     this.spinner.hide();
      //   }
      // )
    }

    // display form values on success
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.signInForm.value, null, 4));
  }

  onOTPSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.otpForm.invalid) {
      return;
    }
    else {
      if(this.getOtp != this.otpForm.value.otp) {
        this.toastr.error('OTP mismatched!!!', '', {
          timeOut: 3000,
        });
      }
      else {
        this.spinner.show();
        this.otpForm.value.device_token = "";
        this.otpForm.value.mobile = this.mobile;
        this.userService.userSigninOtp(this.otpForm.value).subscribe(
          res => {
            console.log("Login After Otp ==>", res);
            if (res['result']['status'] == true) {
                 localStorage.setItem('isLoggedin', 'true');
              localStorage.setItem('userId', res['result']['user']['id']);
              //   // localStorage.setItem('userType', res['result']['detail']['user_type']);
               localStorage.setItem('userName', res['result']['user']['username']);
               localStorage.setItem('userEmail', res['result']['user']['email']);
              localStorage.setItem('userContact', res['result']['user']['phone_no']);
              localStorage.setItem('userImage', res['result']['user']['profile_image']);
              this.userService.loginStatus(true);
                 this.router.navigate(['/home']);
                 this.dialogRef.close(true);
              this.toastr.success(res['result']['message'], '', {
                timeOut: 3000,
              });
              this.showOtp = false;
              this.submitted = false;
              this.spinner.hide();
            }
            else {
              this.toastr.error(res['result']['message'], '', {
                timeOut: 3000,
              });
              this.spinner.hide();
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
      
    }

    // display form values on success
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.signInForm.value, null, 4));
  }

}

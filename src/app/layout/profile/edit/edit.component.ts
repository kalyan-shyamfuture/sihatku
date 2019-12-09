import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  UserService} from "../../../core/services/user.service";
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  profileEditForm: FormGroup;
  submitted = false;
  userId:any;
  userDetails:any;
  profileImage:any;
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private userService: UserService,
  ) {
    if(localStorage.getItem('userId')){
      this.userId = JSON.parse(localStorage.getItem('userId'));
    } else {
      this.router.navigate(['/home']);
    } 
    this.profileEditForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      contact: ['', [Validators.required, Validators.minLength(10)]],
      profile_image: ['']
      //about_me: ['']
    });
   }

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
    this.getUserDetails(this.userId);
  }

  getUserDetails(id) {
    var data = {
      "userId":localStorage.getItem('userId')
    }
    this.userService.userDetails(data).subscribe(
      res => {
        this.userDetails = res['result']['profile'];

        this.profileEditForm.patchValue({
          name: this.userDetails.username,
          email: this.userDetails.email,
          contact: this.userDetails.phone_no,
          //about_me: this.userDetails.bio
        });
      },
      error => {
        console.log(error);
      }
    )
  }
  get f() { return this.profileEditForm.controls; }
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.profileEditForm.invalid) {
      return;
    }

    else {

      // {"user_id":"3", "name": "shyam_ritu", "email": "shyamritu@gmail.com", "profile_image[]": filename, "gender":"Male", "city":"Kolkata", "dob": "2019-01-01"}
        // var data = {
        //   user_id: localStorage.getItem('userId'),
        //   name: this.profileEditForm.value.name,
        //   email: this.profileEditForm.value.email,
        //   contact: this.profileEditForm.value.contact,
        //   //about_me: this.profileEditForm.value.about_me,
        //   profile_image: ''
        // };
        let formData = new FormData();
        formData.append('user_id' , localStorage.getItem('userId'));
        formData.append('name' , this.profileEditForm.value.name);
        formData.append('email' , this.profileEditForm.value.email);
        formData.append('profile_image' , this.profileImage);
        this.userService.editProfile(formData).subscribe(
          res => {
            // localStorage.setItem('userName', res['result']['detail']['name']);
            // localStorage.setItem('userEmail', res['result']['detail']['email']);
            // localStorage.setItem('userContact', res['result']['detail']['contact']);
            this.userService.loginStatus(true);
            this.router.navigate(['/profile']);
          },
          error => {
            console.log(error.error);
            this.toastr.error('Sorry! Please enter valid login creadentials', '', {
              timeOut: 3000,
            });
          }
        )

   

    }

    // display form values on success
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.signInForm.value, null, 4));
  }

  addImage(event) {
    if (event.target.files.length) {
      this.profileImage = event.target.files[0];
      console.log(event.target.files[0]);

    }
  }

}

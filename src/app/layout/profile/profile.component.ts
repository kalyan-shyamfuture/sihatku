import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  UserService} from "../../core/services/user.service";
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileViewForm: FormGroup;
  submitted = false;
  userId:any;
  userDetails:any;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService,
  ) {
    if(localStorage.getItem('userId')){
      this.userId = JSON.parse(localStorage.getItem('userId'));
    } else {
      this.router.navigate(['/home']);
    } 
    this.profileViewForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      contact: ['', [Validators.required, Validators.minLength(10)]],
      //about_me: [''],
    });


    this.userId = localStorage.getItem('userId');
    this.getUserDetails(this.userId);
   // alert(this.userId);
    
   }

  ngOnInit() {
   
  }

  get f() { return this.profileViewForm.controls; }

  getUserDetails(id) {
    var data = {
      "userId":localStorage.getItem('userId')
    }
    this.userService.userDetails(data).subscribe(
      res => {
        this.userDetails = res['result']['profile'];
        this.profileViewForm.patchValue({
          name: this.userDetails.username,
          email: this.userDetails.email,
          contact: this.userDetails.phone_no,
         // about_me: this.userDetails.bio
        });
      },
      error => {
        console.log(error);
      }
    )
  }

  gotoPage(id) {
    this.router.navigateByUrl('/profile/edit/'+id);
  }

}

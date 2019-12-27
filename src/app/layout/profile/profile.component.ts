import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from "../../core/services/user.service";
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileViewForm: FormGroup;
  submitted = false;
  userId: any;
  userDetails: any;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService,
  ) {
  }

  ngOnInit() {

  }


}

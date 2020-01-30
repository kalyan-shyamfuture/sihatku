import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from "../../../../core/services/user.service";
import { MainService } from "../../../../core/services/main.service";
import { FormControlValidator,PasswordValidator } from "../../../../core/validators";

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangepasswordComponent implements OnInit {
  chnagePasswordForm: FormGroup;
  submitted = false;
  userId: any;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private mainService:MainService,
  ) { 
    this.userId = localStorage.getItem('userId');
  }

  ngOnInit() {
  
    this.chnagePasswordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['',Validators.required],
    }
    ,{ validator: PasswordValidator('password', 'confirmPassword') })
  }

  get changePasswordControls() {
    return this.chnagePasswordForm.controls;
  }

  errorState(field, validatorFieldName) {
    return FormControlValidator(field, validatorFieldName);
  }

  passwordUpdate() {
    console.log("Form Submit==>",this.chnagePasswordForm.value);
  }

}

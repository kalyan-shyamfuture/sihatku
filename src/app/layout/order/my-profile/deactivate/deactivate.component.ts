import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from "../../../../core/services/user.service";
import { MainService } from "../../../../core/services/main.service";
import { FormControlValidator,PasswordValidator } from "../../../../core/validators";

@Component({
  selector: 'app-deactivate',
  templateUrl: './deactivate.component.html',
  styleUrls: ['./deactivate.component.scss']
})
export class DeactivateComponent implements OnInit {
  deactivateForm: FormGroup;
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
  
    this.deactivateForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    })
  }

  get deactivateControls() {
    return this.deactivateForm.controls;
  }

  errorState(field, validatorFieldName) {
    return FormControlValidator(field, validatorFieldName);
  }

  deactivateAccount() {
    console.log("Form Submit==>",this.deactivateForm.value);
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from "../../core/services/user.service";
import { MainService } from "../../core/services/main.service";

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
  isReadonly = true;
  profileUpdateButton = true;
  listCountry:any=[];
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private mainService:MainService,
  ) {
  }

  ngOnInit() {
    this.getCountry();
    this.profileViewForm = this.formBuilder.group({
      firstName:['Pratick',Validators.required],
      lastName:['Chgakraborty',Validators.required],
      dob:['',Validators.required],
      gender:['1',Validators.required],
      country:[1,Validators.required],
      number:['7001509923',Validators.required],
      email:['pc.email1996@gmail.com',Validators.required],
      address1:['Kolkata',Validators.required],
      address2:['saltlake',Validators.required],
      city:[1,Validators.required],
      state:[1,Validators.required],
      pincode:['713213',Validators.required],
    })
  }
  
  genderList: any = [
    { id: 1, type: "Male" },
    { id: 2, type: "Female" },
    { id: 3, type: "Others" },
  ]
  cityList: any = [
    { id: 1, name: "Kolkata" },
    { id: 2, name: "Delhi" },
    { id: 3, name: "Pune" },
  ]
  stateList: any = [
    { id: 1, name: "WestBengal" },
  ]
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

  public errorHandling = (form: FormGroup,control: string, error: string) => {
    return form.controls[control].hasError(error);
  }
  edit(){
    this.isReadonly = !this.isReadonly;
    this.profileUpdateButton = !this.profileUpdateButton;
  }

}

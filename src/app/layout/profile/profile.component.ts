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
    this.userId = localStorage.getItem('userId');
  }

  ngOnInit() {
    this.getCountry();
    this.profileViewForm = this.formBuilder.group({
      firstName:['',Validators.required],
      lastName:['',Validators.required],
      dob:['',Validators.required],
      gender:['1',Validators.required],
      country:[1,Validators.required],
      number:['',Validators.required],
      email:['',Validators.required],
      address1:['',Validators.required],
      address2:['',Validators.required],
      city:[1,Validators.required],
      state:[1,Validators.required],
      pincode:['',Validators.required],
    })

    this.getProfile(this.userId);
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

  getProfile(id) {
    this.userService.getUserProfile(id).subscribe(
      res => {
        console.log("User profile Details==>",res['response'][0]);
       this.userDetails = res['response'][0];
       this.profileViewForm.patchValue({
        //name: this.userDetails.name,
        email:this.userDetails.EmailID,
        phone:this.userDetails.Phone,
        aboutClinic:this.userDetails.aboutClinic,
        providerType:this.userDetails.providerType,
        centerLogoFile:'',
        providerAdd1:this.userDetails.providerAdd1,
        providerAdd2:this.userDetails.providerAdd2,
        city:this.userDetails.city,
        state:this.userDetails.state,
        ZIP:this.userDetails.ZIP,
        country:this.userDetails.country,
      });
      },
      error => {
        console.log(error.error);
       
      }
    )
  }
  profileUpdate() {

  }

}

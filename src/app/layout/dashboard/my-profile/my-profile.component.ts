import { Component, OnInit, ɵConsole } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { MainService } from "../../../core/services/main.service";
import { UserService } from "../../../core/services/user.service";
import { environment } from "../../../../environments/environment";
import { FormControlValidator,PasswordValidator } from "../../../core/validators";
@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {
  isReadonly = true;
  profileUpdateButton = true;
  profileViewForm: FormGroup;
  public centerLogo: any;
  fileDataCenterLogo:any;
  imgCenterURL:any;
  listCountry:any=[];
  userId:any;
  profileDetails:any={};

  constructor(
    private formBuilder: FormBuilder,
    public mainService:MainService,
    public userService:UserService
  ) { 
    this.userId = localStorage.getItem('userId');
  }

  ngOnInit() {
    this.getCountry();
    this.profileViewForm = this.formBuilder.group({
      //email:['',Validators.required],
      // clinicName:['',Validators.required],
      // aboutClinic:['',Validators.required],
      // providerType:['1',Validators.required],
      // centerLogoFile:[''],
      // providerAdd1:['',Validators.required],
      // providerAdd2:['',Validators.required],
      // city:['',Validators.required],
      // state:['',Validators.required],
      // ZIP:['',Validators.required],
      // country:['',Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      mobile: ['', [Validators.required, Validators.maxLength(10)]],
      businessName: ['', [Validators.required]],
      businessDesc: ['', [Validators.required]],
      businessAddress: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      country: ['', [Validators.required]],
      zip: ['', [Validators.required]],
      providerType: ['1'],
      centerLogoFile: [''],
    })

    this.getProfile(this.userId);
  }

  get profileViewControls() {
    return this.profileViewForm.controls;
  }

  errorState(field, validatorFieldName) {
    return FormControlValidator(field, validatorFieldName);
  }



  cityList: any = [
    { id: 1, name: "Kolkata" },
    { id: 2, name: "Delhi" },
    { id: 3, name: "Pune" },
  ]
  stateList: any = [
    { id: 1, name: "WestBengal" },
    { id: 2, name: "Patna" },
  ]
  public errorHandling = (form: FormGroup,control: string, error: string) => {
    return form.controls[control].hasError(error);
  }
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
  edit(){
    this.isReadonly = !this.isReadonly;
    this.profileUpdateButton = !this.profileUpdateButton;
  }

  getProfile(id) {
    this.userService.getProviderProfile(id).subscribe(
      res => {
        this.profileDetails = res['response'][0];
        console.log("Provider profile Details==>",this.profileDetails);
        this.imgCenterURL = this.profileDetails.Logo;
        console.log("Center Logo ==>",this.imgCenterURL);
        this.profileViewForm.patchValue({
          email: this.profileDetails.Email,
          mobile: this.profileDetails.PhoneNo,
          businessName: this.profileDetails.BusinessName,
          businessDesc: this.profileDetails.aboutBusiness,
          businessAddress: this.profileDetails.Address,
          city:this.profileDetails.City,
          state: this.profileDetails.State,
          country: this.profileDetails.Country,
          zip: this.profileDetails.PINCode,
          providerType: this.profileDetails.providerType,
          centerLogoFile: this.profileDetails.Logo,
        });
        
      },
      error => {
        console.log(error.error);
       
      }
    )
  }


  profileUpdate()
  {
    console.log(this.profileViewForm.value);
    if(this.profileViewForm.valid){

    this.userService.updatedProviderProfile(this.profileViewForm.value).subscribe(
      response=>{
        console.log(response);
        console.log(response['message']);
        if(response['status']==1){
         console.log(response['message']);
         
        }
      }
    )
  }
  else{
    alert("error")
  }
    
  }
  centerLogoUpload(event,formControl: FormControl) {
    console.log(event);
    if (event.target.files.length) {
      this.centerLogo = event.target.files[0];
    this.fileDataCenterLogo = <File>event.target.files[0];
    const formData = new FormData();
    formData.append('ImageUpload', this.fileDataCenterLogo, this.fileDataCenterLogo.name);
    this.mainService.uploadImage(formData).subscribe(
      res => {

        console.log("Center Logo Upload==>",res);
        console.log("Image Url==>",environment.imageEndpoint+res);
        this.imgCenterURL = environment.imageEndpoint+res;
        formControl.setValue(environment.imageEndpoint+res);
        
      },
      error => {
       
      }
    )
    }
}



}

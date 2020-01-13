import { Component, OnInit, ɵConsole } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { MainService } from "../../../core/services/main.service";
import { UserService } from "../../../core/services/user.service";
import { environment } from "../../../../environments/environment";

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
      email:['',Validators.required],
      clinicName:['',Validators.required],
      aboutClinic:['',Validators.required],
      providerType:['1',Validators.required],
      centerLogoFile:[''],
      providerAdd1:['',Validators.required],
      providerAdd2:['',Validators.required],
      city:['',Validators.required],
      state:['',Validators.required],
      ZIP:['',Validators.required],
      country:['',Validators.required],
    })

    this.getProfile(this.userId);
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
        this.profileViewForm.patchValue({
          //name: this.userDetails.name,
          email:this.profileDetails.providerEmail,
          clinicName:this.profileDetails.clinicName,
          aboutClinic:this.profileDetails.aboutClinic,
          providerType:this.profileDetails.providerType,
          centerLogoFile:'',
          providerAdd1:this.profileDetails.providerAdd1,
          providerAdd2:this.profileDetails.providerAdd2,
          city:this.profileDetails.city,
          state:this.profileDetails.state,
          ZIP:this.profileDetails.ZIP,
          country:this.profileDetails.country,
        });
        
      },
      error => {
        console.log(error.error);
       
      }
    )
  }


  profileUpdate()
  {
    if(this.profileViewForm.valid){
    this.userService.updatedProfileValue(this.profileViewForm.value).subscribe(
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
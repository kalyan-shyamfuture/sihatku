import { Component, OnInit, ɵConsole } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MainService } from "../../../core/services/main.service";
import { UserService } from "../../../core/services/user.service";
import { environment } from "../../../../environments/environment";
import { NgxSpinnerService } from "ngx-spinner";
import { FormControlValidator, PasswordValidator } from "../../../core/validators";
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
  fileDataCenterLogo: any;
  imgCenterURL: any;
  listCountry: any = [];
  userId: any;
  profileDetails: any = {};
  listSpeciality: any = [];
  listState:any=[];
  constructor(
    private formBuilder: FormBuilder,
    public mainService: MainService,
    public userService: UserService,
    private spinner: NgxSpinnerService
  ) {
    this.userId = localStorage.getItem('userId');
  }

  ngOnInit() {
    this.getCountry();
    this.profileViewForm = this.formBuilder.group({
   
      email: ['', [Validators.required, Validators.email]],
      phoneNo: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(12)]],
      mobileNo: [''],
      clinicName: ['', [Validators.required]],
      aboutClinic: ['', [Validators.required]],
      clinicAddress: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      country: ['', [Validators.required]],
      zip: ['', [Validators.required]],
      providerType: ['1'],
      centerLogo: [''],
      speciality: ['', [Validators.required]],
    })

    this.getProfile(this.userId);
    this.getSpeiality();
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
  public errorHandling = (form: FormGroup, control: string, error: string) => {
    return form.controls[control].hasError(error);
  }
  getCountry() {
    this.mainService.getCountryList().subscribe(
      res => {
        //console.log("Country List==>", res);
        this.listCountry = res['response']
        // //console.log("List Country ==>",this.listCountry);
      },
      error => {
        //console.log(error.error);

      }
    )
  }
  edit() {
    this.isReadonly = !this.isReadonly;
    this.profileUpdateButton = !this.profileUpdateButton;
  }

  getProfile(id) {
    this.spinner.show();
    this.userService.getProviderProfile(id).subscribe(
      res => {
        //console.log(res['response']);

        this.profileDetails = res['response']['ProviderDetails'][0];

        var updateSpecilityId = Array.prototype.map.call(this.profileDetails['Speciality'], function(item) { return item.specialityID; }).join(",");
        localStorage.setItem('specialityId', updateSpecilityId);
        //console.log("zzzz==>",updateSpecilityId);
        //console.log("Provider profile Details==>", this.profileDetails);
        this.imgCenterURL = this.profileDetails.centerLogoFile;
        //console.log("Center Logo ==>", this.imgCenterURL);
        this.getState(this.profileDetails.country)
        this.profileViewForm.patchValue({

          email: this.profileDetails.providerEmail,
          phoneNo: this.profileDetails.PhoneNo,
          mobileNo: this.profileDetails.MobileNo,
          clinicName: this.profileDetails.clinicName,
          aboutClinic: this.profileDetails.aboutClinic,
          clinicAddress: this.profileDetails.providerAdd1,
          city: this.profileDetails.city,
          state: this.profileDetails.state,
          country: this.profileDetails.country,
          zip: this.profileDetails.ZIP,
          providerType: this.profileDetails.providerType,
          centerLogo: this.profileDetails.centerLogoFile,
          speciality: this.profileDetails['Speciality'],
         
        });
        this.spinner.hide();

      },
      error => {
        //console.log(error.error);
        this.spinner.hide();

      }
    )
  }


  profileUpdate() {
    //console.log(this.profileViewForm.value);
    this.profileViewForm.value.Id = this.userId;
    if (this.profileViewForm.valid) {

      this.userService.updatedProviderProfile(this.profileViewForm.value).subscribe(
        response => {
          //console.log(response);
          //console.log(response['message']);
          if (response['status'] == 1) {
            //console.log(response['message']);
            this.getProfile(this.userId);
            this.isReadonly = true;
            this.profileUpdateButton = true;

          }
        }
      )
    }
    else {
      alert("error")
    }

  }
  centerLogoUpload(event, formControl: FormControl) {
    //console.log(event);
    if (event.target.files.length) {
      this.centerLogo = event.target.files[0];
      this.fileDataCenterLogo = <File>event.target.files[0];
      const formData = new FormData();
      formData.append('ImageUpload', this.fileDataCenterLogo, this.fileDataCenterLogo.name);
      this.mainService.uploadImage(formData).subscribe(
        res => {

          //console.log("Center Logo Upload==>", res);
          //console.log("Image Url==>", environment.imageEndpoint + res);
          this.imgCenterURL = environment.imageEndpoint + res;
          formControl.setValue(environment.imageEndpoint + res);

        },
        error => {

        }
      )
    }
  }

  getSpeiality() {
    this.mainService.getSpecialityList().subscribe(
      res => {
        this.listSpeciality = res['response'];

      },
      error => {
        //console.log(error.error);
      }
    )
  }

  getState(id) {
    //console.log(id);
    var data = {
      "ID":id
    }
    this.mainService.getStateList(data).subscribe(
      res => {
        this.listState = res['response'];
        //console.log(this.listState);
      },
      error => {
        //console.log(error.error);
      }
    )
  }



}

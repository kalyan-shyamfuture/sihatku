import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder ,Validators , FormArray, FormControl} from '@angular/forms';
import { PasswordValidation } from '../../core/validation/PasswordValidation';
import {  MainService} from "../../core/services/main.service";
import { UserService } from "../../core/services/user.service";
import { FormControlValidator } from "../../core/validation/form-control.validator";
import { environment } from "../../../environments/environment";
@Component({
  selector: 'app-sproviderreg',
  templateUrl: './sproviderreg.component.html',
  styleUrls: ['./sproviderreg.component.scss']
})
export class SproviderregComponent implements OnInit {
  public centerLogo: any;
  public practionarLogo:any;
  public proImage:any=[];
  fileDataCenterLogo:any;
  practionerImage:any;
  fileDataProfile:any;
  procedureImage:any;
  imgPractURL:any;
  imgCenterURL:any;
  serviceRegForm: FormGroup;
  submitted: boolean = false;
  services_details: FormArray;
  practioner_details: FormArray;
  myForm: FormGroup;
  listSpeciality:any =[];
  listProcedure:any=[];
  listTitle:any = [
    {
      "id":1,
      "name":"Mr"
    },
    {
      "id":2,
      "name":"Mrs"
    }

  ];
  listGender:any = [
    {
      "id":1,
      "name":"Male"
    },
    {
      "id":2,
      "name":"Female"
    }

  ];
  listCountry:any=[];

  listfieldSpeciality:any=[
    {
      "id":1,
      "name":"Speciality 1"
    },
    {
      "id":2,
      "name":"Speciality 2"
    },
    {
      "id":3,
      "name":"Speciality 3"
    },
    {
      "id":4,
      "name":"Speciality 4"
    }
  ];

  constructor(
    private formBuilder: FormBuilder,
    public mainService:MainService,
    public userService:UserService
  ) { 
    
  }

  ngOnInit() {
      this.serviceRegForm = this.formBuilder.group({
        providerEmail: ['k@k.com', [Validators.required, Validators.email]],
        providerPassword: ['12345678 ', [Validators.required, Validators.minLength(6)]],
        providerconfirmPassword: ['12345678', [Validators.required]],
        clinicName: ['Test Clinic', [Validators.required]],
        aboutClinic: ['This is about the clinic', [Validators.required]],
        providerType:['1'],
        centerLogoFile: [''],
        services_details: this.formBuilder.array([ this.servicecreate() ]),
      }, {
        validator: PasswordValidation.MatchPasswordProvider
      })

    this.getSpeiality();
   // this.getProcedure();
    this.getCountry();

  }

  errorState(field, validatorFieldName) {
    return FormControlValidator(field, validatorFieldName);
  }

  getSpeiality() {
    this.mainService.getSpecialityList().subscribe(
      res => {
      //  console.log("Speciality List==>",res);
        this.listSpeciality = res['response']
       // console.log("List Speciality ==>",this.listSpeciality);
      },
      error => {
        console.log(error.error);
       
      }
    )
    
  }

  getProcedure(event) {
    console.log(event.value);
    this.mainService.getProcedurebySpeciality(event.value).subscribe(
      res => {
        console.log("Speciality List==>",res);
        this.listProcedure = res['response']
        console.log("List Procedure ==>",this.listProcedure);
      },
      error => {
        console.log(error.error);
       
      }
    )
  }

  getCountry() {
    this.mainService.getCountryList().subscribe(
      res => {
       // console.log("Country List==>",res);
        this.listCountry = res['response']
       // console.log("List Country ==>",this.listCountry);
      },
      error => {
        console.log(error.error);
       
      }
    )
  }

  get f() { return this.serviceRegForm.controls; }

  servicecreate(): FormGroup {
    return this.formBuilder.group({
      servicesSpeciality:['1', Validators.required],
      servicesProcedure:['', Validators.required],
      servicesProcDesc: ['This is about procedure', Validators.required],
      servicePromoCode: ['zzz123', Validators.required],   
      USAPrice: ['10', Validators.required],
      locPrice: ['100', Validators.required],
      discPrice:['10', Validators.required],
      procedureImageFile: [''],
      practioner_details: this.formBuilder.array([ this.practionercreate() ])
    });
  }

  serviceaddItem(): void {
    this.services_details = this.serviceRegForm.get('services_details') as FormArray;
    this.services_details.push(this.servicecreate());
    console.log(this.serviceRegForm);
  }



  practionercreate(): FormGroup{
    return this.formBuilder.group({
      firstName:['Kalyan ', Validators.required],
      lastName:['Acharya', Validators.required],
      passportNumber: ['123456', Validators.required],
      gender: ['1', Validators.required],
      fieldSpeciality: ['', Validators.required],
     // placeofPractice:['', Validators.required],
      medicalCouncilNo:['5655676', Validators.required],
      medicalSchool: ['aaaaaaa', Validators.required],
      title:['1', Validators.required],
      country: ['1', Validators.required],
      contactNumber:['7894561230', Validators.required],
      expertiseCategory: ['', Validators.required],
      address:['Kolkata', Validators.required],
      registrationNo: ['9999999', Validators.required],
      aboutPractioner: ['This is about practioner', Validators.required],
      DOB: ['', Validators.required],
     // pracsubCategory: ['1', Validators.required],
      practisingSince: ['2010', Validators.required],
      qualification: ['MBBS', Validators.required],
      practImageFile: [''],
      
    });
  }
  practioneraddItem(index): void {
    console.log(index); 
    this.services_details = this.serviceRegForm.get('services_details') as FormArray;
    const practitionerForm = this.services_details.at(index).get('practioner_details') as FormArray;
    practitionerForm.push(this.practionercreate());
    console.log(this.serviceRegForm);
  }


  deleteServices(servicesIndex){
    this.services_details.removeAt(servicesIndex);
  }

  deletePractioner(servicesIndex,practionerIndex){
   const serviceForm = this.services_details.at(servicesIndex).get('practioner_details') as FormArray;
   serviceForm.removeAt(practionerIndex);
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.serviceRegForm.invalid) {
      console.log("Form Invalid");
      return;
    }

    else {
      console.log("Form is valid");
      console.log(this.serviceRegForm.value);
      console.log(JSON.stringify(this.serviceRegForm.value))

    }
  }

    /* Handle form errors in Angular 8 */
    public errorHandling = (form: FormGroup,control: string, error: string) => {
      return form.controls[control].hasError(error);
    }

    // centerLogoUpload(event) {
    //     if (event.target.files.length) {
    //       this.centerLogo = event.target.files[0];
    //     //  console.log(this.centerLogo);
    //     }

    //     if (event.target.files.length) {
    //       this.centerLogo = event.target.files[0];
    //       console.log(this.centerLogo);
    //       var reader = new FileReader();
    //       reader.readAsDataURL(event.target.files[0]); 
    //       reader.onload = (_event) => { 
    //         this.imgCenterURL = reader.result; 
    //         console.log(this.imgCenterURL);
    //       }
    //     }
    // }

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

  practionarImageUpload(event,formControl: FormControl) {
    console.log(formControl);
    if (event.target.files.length) {
      this.practionerImage = event.target.files[0];
    this.fileDataProfile = <File>event.target.files[0];
    const formData = new FormData();
    formData.append('ImageUpload', this.practionerImage, this.practionerImage.name);
    this.mainService.uploadImage(formData).subscribe(
      res => {
        console.log("Practioner Image Upload==>",res);
        formControl.setValue(environment.imageEndpoint+res);
      },
      error => {
       
      }
    )
    }
}

    procedureImageUpload(event,formControl: FormControl) {
      // for(var i = 0; i < event.target.files.length; i++ ) {
      //     this.proImage.push(event.target.files[i]);
      // }
      const formData = new FormData();
      if (event.target.files.length) {
         for(var i = 0; i < event.target.files.length; i++ ) {
          this.proImage.push(event.target.files[i]);
          formData.append('[]', event.target.files[i], event.target.files[i].name);
        }
      console.log(this.proImage);
       this.procedureImage =this.proImage;
     this.fileDataProfile = <FileList>this.proImage;
       // this.procedureImage = event.target.files[0];
     // this.fileDataProfile = <File>event.target.files[0];
      
      this.mainService.uploadImage(formData).subscribe(
        res => {
          console.log("procedureImage Upload==>",res);
          console.log(typeof(res));
          var proImg = String(res);
          if(res) {
 //console.log(res.split(","));
          var imgList = proImg.split(",");
          var newImgList = imgList.map(image => {
            image = environment.imageEndpoint+image;
            console.log(image);
            return image;
          });
          console.log(newImgList);
          formControl.setValue(newImgList);
          }
         
        },
        error => {
         
        }
      )
     
      }

    
    }

    // practionarImageUpload(event) {
    //   if (event.target.files.length) {
    //     this.practionarLogo = event.target.files[0];
    //     console.log(this.centerLogo);
    //     var reader = new FileReader();
    //     reader.readAsDataURL(event.target.files[0]); 
    //     reader.onload = (_event) => { 
    //       this.imgPractURL = reader.result; 
    //       console.log(this.imgPractURL);
    //     }
    //   }
    // }

    submitForm() {
      console.log(this.serviceRegForm.valid);
      if(this.serviceRegForm.valid) {
        const formValue = [this.serviceRegForm.value];
        //   let formData = new FormData();
          // formData.append('servicedetails[].name', this.serviceRegForm.value.name);
          // formData.append('servicedetails[].name', this.serviceRegForm.value.name);
         // formData.append('email', this.serviceRegForm.value.email);
         // console.log(formData);
          this.userService.serviceProRegister(formValue).subscribe(
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
      else {
        console.log(this.serviceRegForm.value)
        this.serviceRegForm.markAllAsTouched();
      }
      
      
     
    }




}

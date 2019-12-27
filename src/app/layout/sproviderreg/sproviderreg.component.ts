import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder ,Validators , FormArray} from '@angular/forms';
import { PasswordValidation } from '../../core/validation/PasswordValidation';
import {  MainService} from "../../core/services/main.service";
import { FormControlValidator } from "../../core/validation/form-control.validator";
@Component({
  selector: 'app-sproviderreg',
  templateUrl: './sproviderreg.component.html',
  styleUrls: ['./sproviderreg.component.scss']
})
export class SproviderregComponent implements OnInit {
  public centerLogo: any;
  public practionarLogo:any;
  public proImage:any=[];
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
    public mainService:MainService
  ) { 
    
  }

  ngOnInit() {
      this.serviceRegForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
        clinicName: ['', [Validators.required]],
        aboutClinic: ['', [Validators.required]],
        providerType:['1'],
        services_details: this.formBuilder.array([ this.servicecreate() ]),
      }, {
        validator: PasswordValidation.MatchPassword
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
        console.log("Speciality List==>",res);
        this.listSpeciality = res['response']
        console.log("List Speciality ==>",this.listSpeciality);
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
        console.log("Country List==>",res);
        this.listCountry = res['response']
        console.log("List Country ==>",this.listCountry);
      },
      error => {
        console.log(error.error);
       
      }
    )
  }

  get f() { return this.serviceRegForm.controls; }

  servicecreate(): FormGroup {
    return this.formBuilder.group({
      speciality:['', Validators.required],
      aboutProcedure: ['', Validators.required],
      setPromoCode: ['', Validators.required],
      selectProcedure:['', Validators.required],
      setPrice: ['', Validators.required],
      discount:['', Validators.required],
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
      firstName:['', Validators.required],
      lastName:['', Validators.required],
      passportNumber: ['', Validators.required],
      gender: ['', Validators.required],
      fieldSpeciality: ['', Validators.required],
      placeofPractice:['', Validators.required],
      medicalCouncilNo:['', Validators.required],
      medicalSchool: ['', Validators.required],
      title:['', Validators.required],
      country: ['', Validators.required],
      contactNumber:['', Validators.required],
      expertiseCategory: ['', Validators.required],
      addressPractice:['', Validators.required],
      registrationNo: ['', Validators.required],
      aboutPractioner: ['', Validators.required],
      dob: ['', Validators.required],
      pracsubCategory: ['', Validators.required],
      practisingSince: ['', Validators.required],
      qualification: ['', Validators.required],
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

    centerLogoUpload(event) {
        if (event.target.files.length) {
          this.centerLogo = event.target.files[0];
          console.log(this.centerLogo);
        }

        if (event.target.files.length) {
          this.centerLogo = event.target.files[0];
          console.log(this.centerLogo);
          var reader = new FileReader();
          reader.readAsDataURL(event.target.files[0]); 
          reader.onload = (_event) => { 
            this.imgCenterURL = reader.result; 
            console.log(this.imgCenterURL);
          }
        }
    }

    procedureImageUpload(event) {
      console.log(event.target.files.length);
     // this.proImage = [];
      for(var i = 0; i < event.target.files.length; i++ ) {
          this.proImage.push(event.target.files[i]);
      }
      console.log(this.proImage);
    
    }

    practionarImageUpload(event) {
      if (event.target.files.length) {
        this.practionarLogo = event.target.files[0];
        console.log(this.centerLogo);
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]); 
        reader.onload = (_event) => { 
          this.imgPractURL = reader.result; 
          console.log(this.imgPractURL);
        }
      }
    }

    submitForm() {
      console.log(this.serviceRegForm.value)
      this.serviceRegForm.markAllAsTouched();
      let formData = new FormData();
     // formData.append('servicedetails[].name', this.serviceRegForm.value.name);
     // formData.append('servicedetails[].name', this.serviceRegForm.value.name);
     formData.append('email', this.serviceRegForm.value.email);
     console.log(formData);
    }




}

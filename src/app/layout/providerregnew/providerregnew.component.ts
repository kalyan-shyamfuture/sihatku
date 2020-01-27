import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl, AbstractControl } from '@angular/forms';
import { PasswordValidation } from '../../core/validation/PasswordValidation';
import { MainService } from "../../core/services/main.service";
import { UserService } from "../../core/services/user.service";
import { environment } from "../../../environments/environment";
import { ToastrService } from 'ngx-toastr';
import { Router, NavigationEnd } from '@angular/router';

import { FormControlValidator, PasswordValidator } from "../../core/validators";

@Component({
  selector: 'app-providerregnew',
  templateUrl: './providerregnew.component.html',
  styleUrls: ['./providerregnew.component.scss']
})
export class ProviderregnewComponent implements OnInit {
  isShow: boolean = true;
  public centerLogo: any;
  imgCenterURL: any;
  serviceRegForm: FormGroup;
  submitted: boolean = false;
  services_details: FormArray;
  practioner_details: FormArray;
  fileDataCenterLogo: any;
  listSpeciality: any = [];
  listProcedure: any = [];
  listCountry:any;
  yearList:any=[];
  allData:any=[];
  specialityDetails:any=[];
  listTitle: any = [
    {
      "id": '1',
      "name": "Mr"
    },
    {
      "id": '2',
      "name": "Mrs"
    }

  ];
  listGender: any = [
    {
      "id": '1',
      "name": "Male"
    },
    {
      "id": '2',
      "name": "Female"
    }

  ];
  constructor(
    private formBuilder: FormBuilder,
    public mainService: MainService,
    public userService: UserService,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getSpeiality();
    this.getCountry();
    this.getYear();
    this.serviceRegForm = this.formBuilder.group({
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
      practioner_details: this.formBuilder.array([this.practionercreate()]),
     // services_details: this.formBuilder.array([ this.servicecreate() ]),
      //aboutProcedure: [''],
      serviceDetails:this.formBuilder.array([])
    }, {
        // validator: PasswordValidation.MatchPasswordProvider
        validator: PasswordValidator('password', 'confirmPassword')
      })
  }

  getSpeiality() {
    this.mainService.getSpecialityList().subscribe(
      res => {
        this.listSpeciality = res['response'];
        console.log("List Speciality ==>", this.listSpeciality);

      },
      error => {
        console.log(error.error);
      }
    )
  }

  getCountry() {
    this.mainService.getCountryList().subscribe(
      res => {
        this.listCountry = res['response'];
        console.log("List Country ==>", this.listCountry);

      },
      error => {
        console.log(error.error);
      }
    )
  }

  getYear() {
      var currentYear = new Date().getFullYear();
      console.log(currentYear);
      var year = [];

      for (var i = 0; i < 60; i++) {
        year.push({
          id: i +1,
          name: parseInt(String(currentYear - i))
        });
      }
     this.yearList =year;
      console.log(this.yearList);
      
      

  }

  get serviceRegControls() {
    return this.serviceRegForm.controls;
  }

  errorState(field, validatorFieldName) {
    return FormControlValidator(field, validatorFieldName);
  }

  centerLogoUpload(event, formControl: AbstractControl) {
    console.log(event);
    if (event.target.files.length) {
      this.centerLogo = event.target.files[0];
      this.fileDataCenterLogo = <File>event.target.files[0];
      const formData = new FormData();
      formData.append('ImageUpload', this.fileDataCenterLogo, this.fileDataCenterLogo.name);
      this.mainService.uploadImage(formData).subscribe(
        res => {

          console.log("Center Logo Upload==>", res);
          console.log("Image Url==>", environment.imageEndpoint + res);
          this.imgCenterURL = environment.imageEndpoint + res;
          formControl.setValue(environment.imageEndpoint + res);

        },
        error => {

        }
      )
    }
  }

  practionercreate(): FormGroup {
    return this.formBuilder.group({
      title: ['1', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['1', Validators.required],
      passportNumber: ['', Validators.required],
      specialities: [[], Validators.required],
      country: ['', Validators.required],
      licenceNo: ['', Validators.required],
      expertise: ['', Validators.required],
      practicingSince: ['', Validators.required],
      qualification: ['', Validators.required],
      aboutPractioner: ['', Validators.required],
    });
  }
  practioneraddItem(): void {
    this.practioner_details = this.serviceRegForm.get('practioner_details') as FormArray;
    this.practioner_details.push(this.practionercreate());
    console.log(this.serviceRegForm);
  }

  servicecreate(): FormGroup {
    return this.formBuilder.group({
      aboutProcedure: [''],
      // servicesSpeciality:['1', Validators.required],
      // servicesProcedure:['', Validators.required],
      // servicesProcDesc: ['', Validators.required],
      // servicePromoCode: ['', Validators.required],   
      // USAPrice: ['', Validators.required],
      // locPrice: ['', Validators.required],
      // discPrice:['', Validators.required],
      // procedureImageFile: [[]],
      // practioner_details: this.formBuilder.array([ this.practionercreate() ])
    });
  }


  get mainForm() {
    return this.serviceRegForm.get('serviceDetails') as FormArray;
  }

  servicedetailsModel(): FormGroup {
    return this.formBuilder.group({
      speciality: ['', Validators.required],
      procedure: this.formBuilder.array([])
    });
  }

  createServiceDetail(): void {
    const formIndex = this.mainForm.length;
    this.mainForm.push(this.servicedetailsModel());
    // console.log(this.mainForm);
    
  }

  procedureModel(value): FormGroup {
    return this.formBuilder.group({
      id: [value, Validators.required],
      aboutProcedure: ['', Validators.required],
      setPrice: ['', Validators.required],
      locPrice: ['', Validators.required],
    });
  }


  createProcedure(index): void {
    // console.log(index, this.mainForm.at(index));
    const procedureForm = this.mainForm.at(index).get('procedure') as FormArray;
    const procedureValue = procedureForm.controls.length + 1;
    procedureForm.push(this.procedureModel(procedureValue));
  }

  submitForm() {
    console.log(this.serviceRegForm.value);
    this.mainService.providerNewRegistration(this.serviceRegForm.value).subscribe(
      res => {
        console.log("Res==>",res);
      },
      error => {
        console.log(error.error);
      }
    )
  }

  showNext() {
     this.isShow = false;
    console.log(this.serviceRegForm.value);
    let data = [];
    this.allData = [];
    this.serviceRegForm.value.practioner_details.map(item => {
      data = data.concat(item.specialities);
    });
    this.allData = [...new Set(data)];
    console.log(this.allData);
    console.log(this.allData.toString());
    this.getProcedure(this.allData.toString());
    
    // this.specialityDetails.map((spc, key) => {
    //   this.createServiceDetail();
    //   spc.procedureList.forEach(value => {
    //     this.createProcedure(key);
    //   });
    // });
  }
  ShowPrev() {
    this.isShow = true;
  }

  getProcedure(specialitiesId) {
    // this.specialityDetails = [
    //   {
    //     "specilityId": "1",
    //     "specilityName": "Specility 1",
    //     "procedureList": [
    //       {
    //         "id": "1",
    //         "name": "Procedure 1"
    //       }
    //     ]
    //   },
    //   {
    //     "specilityId": "2",
    //     "specilityName": "Specility 2",
    //     "procedureList": [
    //       {
    //         "id": "4",
    //         "name": "Procedure 4"
    //       },
    //       {
    //         "id": "5",
    //         "name": "Procedure 5"
    //       },
    //       {
    //         "id": "6",
    //         "name": "Procedure 6"
    //       }
    //     ]
    //   },
    //   {
    //     "specilityId": "3",
    //     "specilityName": "Specility Test 3",
    //     "procedureList": [
    //       {
    //         "id": "5",
    //         "name": "Procedure 5"
    //       },
    //       {
    //         "id": "6",
    //         "name": "Procedure 6"
    //       },
    //       {
    //         "id": "7",
    //         "name": "Procedure 7"
    //       }
    //     ]
    //   }
    // ]

   
    var data = {
      "SpecID": specialitiesId
    }
    this.mainService.getProcedureListbySpecId(data).subscribe(
      res => {
        console.log("Res==>",res);
        this.specialityDetails = res['response'];
      //  console.log("List Country ==>", this.listCountry);
      this.specialityDetails.map((spc, key) => {
        console.log(spc);
        this.createServiceDetail();
        spc.ProcedureDetails.forEach(value => {
          this.createProcedure(key);
        });
      });
    
      },
      error => {
        console.log(error.error);
      }
    )
  }

}

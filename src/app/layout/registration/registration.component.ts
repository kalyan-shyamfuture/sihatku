import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl, AbstractControl,NgForm } from '@angular/forms';
import { PasswordValidation } from '../../core/validation/PasswordValidation';
import { MainService } from "../../core/services/main.service";
import { UserService } from "../../core/services/user.service";
import { environment } from "../../../environments/environment";
import { ToastrService } from 'ngx-toastr';
import { Router, NavigationEnd } from '@angular/router';

import { FormControlValidator, PasswordValidator } from "../../core/validators";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  public centerLogo: any;
  imgCenterURL: any;
  serviceRegForm: FormGroup;
  fileDataCenterLogo: any;
  submitted: boolean = false;
  listSpeciality: any = [];
  listProcedure: any = [];
  listCountry:any;
  yearList:any=[];
  allData:any=[];
  specialityDetails:any=[];
  listTitle: any = [
    {
      "id": '1',
      "name": "Dr."
    },
    {
      "id": '1',
      "name": "Mr."
    },
    {
      "id": '2',
      "name": "Ms."
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

  listState: any = [];
  modalRef: BsModalRef;
  config = {
    animated: true,
    keyboard: false,
    class: 'modal-sm modal-dialog-centered',
    ignoreBackdropClick: true
  };
  constructor(
    private formBuilder: FormBuilder,
    public mainService: MainService,
    public userService: UserService,
    private toastr: ToastrService,
    private router: Router,
    private modalService: BsModalService,
  
  ) {
    this.serviceRegForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern('(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}'),Validators.minLength(8)]],
      confPassword: ['', [Validators.required]],
      phoneNo: ['', [Validators.required, Validators.minLength(10),Validators.maxLength(12)]],
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
    }, {
        validator: PasswordValidator('password', 'confPassword')
      })
   }

  ngOnInit() {
    this.getSpeiality();
    this.getCountry();
    this.getYear();

  }

  getSpeiality() {
    this.mainService.getSpecialityList().subscribe(
      res => {
        this.listSpeciality = res['response'];

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
      },
      error => {
        console.log(error.error);
      }
    )
  }

  getState(id) {
    console.log(id);
    var data = {
      "ID":id
    }
    this.mainService.getStateList(data).subscribe(
      res => {
        this.listState = res['response'];
        console.log(this.listState);
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
  }

  get serviceRegControls() {
    return this.serviceRegForm.controls;
  }

  errorState(field, validatorFieldName) {
    return FormControlValidator(field, validatorFieldName);
  }

  centerLogoUpload(event, formControl: AbstractControl) {
    if (event.target.files.length) {
      this.centerLogo = event.target.files[0];
      this.fileDataCenterLogo = <File>event.target.files[0];
      const formData = new FormData();
      formData.append('ImageUpload', this.fileDataCenterLogo, this.fileDataCenterLogo.name);
      this.mainService.uploadImage(formData).subscribe(
        res => {

          console.log("Center Logo Upload==>", res);
          console.log("Image Url==>", environment.imageEndpoint+'/content/ProcedurelistImage/' + res['response'][0].Name);
          var imgLink = environment.imageEndpoint+'/content/ProcedurelistImage/' + res['response'][0].Name;
          this.imgCenterURL = environment.imageEndpoint+'/content/ProcedurelistImage/' + res['response'][0].Name;
          formControl.setValue(this.imgCenterURL);

        },
        error => {

        }
      )
    }
  }

  submitForm(form: NgForm,template) {
    // this.submitted = true;
    console.log(this.serviceRegForm.value);
    
    this.mainService.newRegistration(this.serviceRegForm.value).subscribe(
      res => {
        console.log("Res==>",res);
        if(res['status'] ==1) {
          this.modalRef = this.modalService.show(template, this.config);
          // this.toastr.success(res['response'][0]['msg'], '', {
          //   timeOut: 4000,
          // });
          // this.serviceRegForm.reset();
        //    this.serviceRegForm.markAsPristine();
        //  this.serviceRegForm.markAsUntouched();
          // this.submitted = false;
         // this.serviceRegForm.reset();
         form.resetForm();
        }
        else {
          this.toastr.error(res['response'][0]['msg'], '', {
            timeOut: 3000,
          });
        }
      },
      error => {
        console.log(error.error);
      }
    )
  }

  confirm(): void {
    this.modalRef.hide();
    console.log("Click Confirm");

  }
 



}

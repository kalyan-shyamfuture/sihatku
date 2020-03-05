import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl, AbstractControl } from '@angular/forms';
import { PasswordValidation } from '../../../../core/validation/PasswordValidation';
import { MainService } from "../../../../core/services/main.service";
import { UserService } from "../../../../core/services/user.service";
import { environment } from "../../../../../environments/environment";
import { ToastrService } from 'ngx-toastr';
import { Router, NavigationEnd } from '@angular/router';
import { FormControlValidator, PasswordValidator } from "../../../../core/validators";

@Component({
  selector: 'app-practioners-add',
  templateUrl: './practioners-add.component.html',
  styleUrls: ['./practioners-add.component.scss']
})
export class PractionersAddComponent implements OnInit {
  practionerForm: FormGroup;
  submitted: boolean = false;
  imgCenterURL:any;
  fileDataPracImg: any;
  img:any;
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
  listCountry:any=[];
  listSpeciality:any=[];
  yearList:any=[];
  userId:any;
  constructor(
    private formBuilder: FormBuilder,
    public mainService: MainService,
    public userService: UserService,
    private toastr: ToastrService,
    private router: Router,
  ) {
    this.practionerForm = this.formBuilder.group({
      title: ['1', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['1', Validators.required],
      speciality: ['', Validators.required],
      country: [''],
      licenceNo: ['', Validators.required],
      practicingSince: ['', Validators.required],
      qualification: ['', Validators.required],
      aboutPractioner: ['', Validators.required],
      img: [''],
    });
   }

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
    this.getCountry();
    this.getProviderSpeiality();
    this.getYear();
  }

  get practionerControls() {
    return this.practionerForm.controls;
  }

  errorState(field, validatorFieldName) {
    return FormControlValidator(field, validatorFieldName);
  }

  getYear() {
    var currentYear = new Date().getFullYear();
    //console.log(currentYear);
    var year = [];

    for (var i = 0; i < 60; i++) {
      year.push({
        id: i +1,
        name: parseInt(String(currentYear - i))
      });
    }
   this.yearList =year;
}

getProviderSpeiality() {
  var data = {
    "ProviderID":this.userId
  }
    this.mainService.getProviderSpecialityList(data).subscribe(
      res => {
        //console.log(res);
        
        this.listSpeciality = res['response'];
        //console.log(this.listSpeciality);
        

      },
      error => {
        //console.log(error.error);
      }
    )
  }

  getCountry() {
    this.mainService.getCountryList().subscribe(
      res => {
        this.listCountry = res['response'];
      },
      error => {
        //console.log(error.error);
      }
    )
  }

  centerLogoUpload(event, formControl: AbstractControl) {
    if (event.target.files.length) {
      this.img = event.target.files[0];
      this.fileDataPracImg = <File>event.target.files[0];
      const formData = new FormData();
      formData.append('img', this.fileDataPracImg, this.fileDataPracImg.name);
      this.mainService.uploadImage(formData).subscribe(
        res => {
          var imgLink = environment.imageEndpoint+'/content/ProcedurelistImage/' + res['response'][0].Name;
          this.imgCenterURL = environment.imageEndpoint+'/content/ProcedurelistImage/' + res['response'][0].Name;
         //console.log(this.imgCenterURL);
         
          formControl.setValue(this.imgCenterURL);

        },
        error => {

        }
      )
    }
  }

  submitForm() {
    // this.submitted = true;
    //console.log(this.practionerForm.value);
    this.practionerForm.value.userId = this.userId;
    this.practionerForm.value.ID = '';
    //console.log(this.practionerForm.value);
    
    
    this.mainService.addProvider(this.practionerForm.value).subscribe(
      res => {
        //console.log("Res==>",res);
        if(res['status'] ==1) {
          this.router.navigate(['/dashboard/practioners']);
          this.toastr.success(res['response'][0]['msg'], '', {
            timeOut: 4000,
          });
        }
        else {
          this.toastr.error(res['response'][0]['msg'], '', {
            timeOut: 3000,
          });
        }
      },
      error => {
        //console.log(error.error);
      }
    )
  }



}

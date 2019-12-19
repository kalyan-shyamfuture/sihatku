import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder ,Validators , FormArray} from '@angular/forms';

@Component({
  selector: 'app-sproviderreg',
  templateUrl: './sproviderreg.component.html',
  styleUrls: ['./sproviderreg.component.scss']
})
export class SproviderregComponent implements OnInit {

  serviceRegForm: FormGroup;
  submitted: boolean = false;
  services_details: FormArray;
  practioner_deatils: FormArray;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.serviceRegForm = this.formBuilder.group({
      email:['', [Validators.required]],
      password:['', [Validators.required]],
      confPass:['', [Validators.required]],
      clinicName:['', [Validators.required]],
      aboutClinic:['', [Validators.required]],
      centerLogo:[''],
      providerType:['1'],
     services_details: this.formBuilder.array([ this.servicecreate() ]),
    })
  }

  get f() { return this.serviceRegForm.controls; }

  servicecreate(): FormGroup {
    return this.formBuilder.group({
      speciality:['', [Validators.required]],
      aboutProcedure: ['', [Validators.required]],
      setPromoCode: ['', [Validators.required]],
      selectProcedure:['', [Validators.required]],
      setPrice: ['', [Validators.required]],
      discount:['', [Validators.required]],
      practioner_deatils: this.formBuilder.array([ this.practionercreate() ])
    });
  }

  serviceaddItem(): void {
    this.services_details = this.serviceRegForm.get('services_details') as FormArray;
    this.services_details.push(this.servicecreate());
    console.log(this.serviceRegForm);
  }

  get removeItem() {
    return this.serviceRegForm.get('services_details') as FormArray;
  }

  deleteServices(servicesIndex){
    
    // var post=servicesIndex;
    console.log(servicesIndex);
    this.services_details.removeAt(servicesIndex);
  }

  practionercreate(): FormGroup{
    return this.formBuilder.group({
      fullName:['', [Validators.required]],
      passportNumber: ['', [Validators.required]],
      dropdown1: ['', [Validators.required]],
      dorpdown2: ['', [Validators.required]],
      placeofPractice: ['', [Validators.required]],
      medicalCouncilNo:['', [Validators.required]],
      medicalSchool: ['', [Validators.required]],
      dorpdown3:['', [Validators.required]],
      countryResidence: ['', [Validators.required]],
      contactNumber:['', [Validators.required]],
      expertiseCategory: ['', [Validators.required]],
      addressPractice:['', [Validators.required]],
      registrationNo: ['', [Validators.required]],
      aboutPractioner: ['', [Validators.required]],
      dob: ['', [Validators.required]],
      subCategory: ['', [Validators.required]],
      practisingSince: ['', [Validators.required]],
      qualification: ['', [Validators.required]],
      uploadpic: [''],
    });
  }
  practioneraddItem(index): void {
    console.log(index); 
    this.services_details = this.serviceRegForm.get('services_details') as FormArray;
    const practitionerForm = this.services_details.at(index).get('practioner_deatils') as FormArray;
    practitionerForm.push(this.practionercreate());
    console.log(this.serviceRegForm);
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.serviceRegForm.value);
    // stop here if form is invalid
    if (this.serviceRegForm.invalid) {
      console.log("Form Invalid");
      return;
    }

    else {
      console.log("Form is valid");

    }
  }


}

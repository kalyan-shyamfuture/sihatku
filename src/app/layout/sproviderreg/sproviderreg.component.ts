import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-sproviderreg',
  templateUrl: './sproviderreg.component.html',
  styleUrls: ['./sproviderreg.component.scss']
})
export class SproviderregComponent implements OnInit {

  registerForm: FormGroup;
  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
  }

}

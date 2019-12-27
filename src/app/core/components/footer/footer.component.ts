import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {  MainService} from '../../../core/services/main.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  settingList: any = {};
  submitted = false;
  subscribeForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]]
  });
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private mainService: MainService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {

  }


}

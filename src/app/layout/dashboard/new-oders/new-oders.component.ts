import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {  MainService} from "../../../core/services/main.service";
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl, AbstractControl } from '@angular/forms';

import { FormControlValidator, PasswordValidator } from "../../../core/validators";
@Component({
  selector: 'app-new-oders',
  templateUrl: './new-oders.component.html',
  styleUrls: ['./new-oders.component.scss']
})
export class NewOdersComponent implements OnInit {
  orderList:any=[];
  userId:any;
  constructor(
    private modalService: BsModalService,
    private mainService: MainService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
  ) {
    this.userId = localStorage.getItem('userId');
   }

  ngOnInit() {
    this.getOrderList();
  }

  getOrderList() {
    // var data = {
    //   "userId":this.userId
    // }
    this.mainService.getOrderListingbyProvider(this.userId).subscribe(
      res => {
        this.orderList = res['response']['OrderDetails'];
        console.log("Order List==>",this.orderList);
        
      },
      error => {
        console.log(error.error); 
      }
  )
  }

}

import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {  MainService} from "../../../core/services/main.service";
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl, AbstractControl } from '@angular/forms';

import { FormControlValidator, PasswordValidator } from "../../../core/validators";

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {
  orderList:any=[];
  userId:any;
  constructor(
    private modalService: BsModalService,
    private mainService: MainService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
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

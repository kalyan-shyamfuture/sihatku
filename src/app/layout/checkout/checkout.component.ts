import { Component, OnInit, Inject, Optional } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MainService } from '../../core/services/main.service';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  cartList: any = [];
  total_usa_price: number = 0;
  total_loc_price: number = 0;
  selectedCartList: any = [];
  selectedMoment: any;
  userName:any;
  today: any = new Date();
  calendarMinDate: any = new Date(this.today.setDate(this.today.getDate() + 3));
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    public mainService: MainService,
  ) { }

  ngOnInit() {
  //  localStorage.setItem('selectedCartList', '');
  this.userName = localStorage.getItem('userName');
    if(localStorage.getItem('selectedCartList')) {
      this.cartList = JSON.parse(localStorage.getItem('selectedCartList'));
      console.log("Checkout Cart List==>",this.cartList);
      this.cartList.forEach(x => {
        this.total_usa_price += parseFloat(x.usaPrice);
        this.total_loc_price += parseFloat(x.locPrice);
        })
    }
   
  }

  gotoPayment() {
    console.log(this.cartList);
    console.log(typeof(this.cartList[0].dateTimeInBuyNowPage));
    localStorage.setItem('selectedCartList', JSON.stringify(this.cartList));
    
    this.router.navigateByUrl('/payment' );
  }

  getSelectedDate(dt1) {
    console.log("Selected Date===>",dt1._selected);
  }

}

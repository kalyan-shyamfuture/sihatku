import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MainService } from "../../core/services/main.service";
import { ToastrService } from 'ngx-toastr';
import { FormControlValidator,PasswordValidator } from "../../core/validators";
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  paymentForm: FormGroup;
  cartList: any = [];
  total_usa_price: number = 0;
  total_loc_price: number = 0;
  showForm:boolean;
  txnId:any;
  constructor(
    private formBuilder: FormBuilder,
    private mainService:MainService,
    private toastr: ToastrService,
    private router: Router,
  ) {
    if(localStorage.getItem('selectedCartList')) {
      this.cartList = JSON.parse(localStorage.getItem('selectedCartList'));
      console.log("Checkout Cart List==>",this.cartList);
      this.cartList.forEach(x => {
        this.total_usa_price += parseFloat(x.USAPrice);
        this.total_loc_price += parseFloat(x.locPrice);
        })
    }
   }

  ngOnInit() {
    //this.loadStripe();
    this.paymentForm = this.formBuilder.group({
      cardName: [''],
      cardNumber: [''],
      cardExpMonth: [''],
      cardExpYear: [''],
      cardCvv: [''],
      paymentType:['1']
    });

  }

  get paymentControls() {
    return this.paymentForm.controls;
  }

  errorState(field, validatorFieldName) {
    return FormControlValidator(field, validatorFieldName);
  }

  selectPayMethod(event) {
    if(event.value ==2) {
      this.showForm =true;
    }
    else {
      this.showForm =false;
    }
  }



payNow() {

  console.log(this.paymentForm.value);
  (<any>window).Stripe.card.createToken({
    number: this.paymentForm.value.cardNumber,
    exp_month: this.paymentForm.value.cardExpMonth,
    exp_year: this.paymentForm.value.cardExpYear,
    cvc: this.paymentForm.value.cardCvv
  }, (status: number, response: any) => {
    console.log(response);
    console.log(status);
    if (status === 200) {
     // this.message = `Success! Card token ${response.card.id}.`;
   console.log("Token Id",response.id)

var data = {
      "CardName": this.paymentForm.value.cardName,
      "Email": localStorage.getItem('userEmail'),
      "Phone": localStorage.getItem('userContact'),
      "CardNumber":this.paymentForm.value.cardNumber,
      "expireDate":this.paymentForm.value.cardExpMonth+'/'+this.paymentForm.value.cardExpYear,
      "CVV":this.paymentForm.value.cardCvv,
      "StripeToken":response.id,
      "Amount": this.total_usa_price,
      "Currency":"INR"
}


   this.mainService.stripePayment(data).subscribe(
    res => {
      console.log(res['message']);

      this.txnId= res['response'][0].TranID;
      

      var data = {
        "userID": localStorage.getItem('userId'),
        "PaymentType": "online",
        "countryCode": "IN",
        "TotalAmount": this.total_usa_price.toFixed(2),
        "TotalLocal": this.total_loc_price.toFixed(2),
        "StripeId": this.txnId,
        "PromoCode": "",
        "Products": this.cartList
      }

      this.mainService.placeOrder(data).subscribe(
        res => {
          console.log(res);
          
          // if(res.status==1) {

          // }
          localStorage.setItem('selectedCartList','');
          this.router.navigateByUrl('/success');
        },
        error => {
          console.log(error.error);
         
        }
      )


    }
  )
    } else {
      console.log(12333);
      
      console.log(response.error.message);
      alert(response.error.message);
      this.toastr.success(response.error.message, '', {
        timeOut: 3000,
      });
      
     // this.message = response.error.message;
    }
  });
}

gotoPayment() {
  var data = {
    "userID": localStorage.getItem('userId'),
    "PaymentType": "offline",
    "countryCode": "IN",
    "TotalAmount": this.total_usa_price.toFixed(2),
    "TotalLocal": this.total_loc_price.toFixed(2),
    "StripeId": "",
    "PromoCode": "",
    "Products": this.cartList
  }

  this.mainService.placeOrder(data).subscribe(
    res => {
      console.log(res);
      
      // if(res.status==1) {

      // }
      localStorage.setItem('selectedCartList','');
      this.router.navigateByUrl('/success');
    },
    error => {
      console.log(error.error);
     
    }
  )

}


}

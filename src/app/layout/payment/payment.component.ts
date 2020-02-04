import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MainService } from "../../core/services/main.service";
import { ToastrService } from 'ngx-toastr';
import { FormControlValidator,PasswordValidator } from "../../core/validators";
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  paymentForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private mainService:MainService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    //this.loadStripe();
    this.paymentForm = this.formBuilder.group({
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

//   loadStripe() {
      
//     if(!window.document.getElementById('stripe-script')) {
//       var s = window.document.createElement("script");
//       s.id = "stripe-script";
//       s.type = "text/javascript";
//       s.src = "https://checkout.stripe.com/checkout.js";
//       window.document.body.appendChild(s);
//     }
// }

// pay(amount) {    
  
//   var handler = (<any>window).StripeCheckout.configure({
//     key: 'pk_test_aeUUjYYcx4XNfKVW60pmHTtI',
//     locale: 'auto',
//     token: function (token: any) {
//       // You can access the token ID with `token.id`.
//       // Get the token ID to your server-side code for use.
//       console.log(token)
//       alert('Token Created!!');
//     }
//   });

//   handler.open({
//     name: 'Demo Site',
//     description: '2 widgets',
//     amount: amount * 100
//   });

// }

// payNow() {
//   console.log(this.paymentForm.value);
//     var handler = (<any>window).StripeCheckout.configure({
//     key: 'pk_test_clXlFvTExolPMjEHnhS5xXTe001jgXk1eS',
//     locale: 'auto',
//     token: function (token: any) {
//       // You can access the token ID with `token.id`.
//       // Get the token ID to your server-side code for use.
//       console.log(token)
//       alert('Token Created!!');
//     }
//   });

//   // handler.open({
//   //   name: 'Demo Site',
//   //   description: '2 widgets',
//   //   amount: 0.01 * 100
//   // });

// }

payNow() {

  console.log(this.paymentForm.value);
  (<any>window).Stripe.card.createToken({
    number: this.paymentForm.value.cardNumber,
    exp_month: this.paymentForm.value.cardExpMonth,
    exp_year: this.paymentForm.value.cardExpYear,
    cvc: this.paymentForm.value.cardCvv
  }, (status: number, response: any) => {
    console.log(response.card.id);
    
    if (status === 200) {
     // this.message = `Success! Card token ${response.card.id}.`;
   console.log("Token Id",response.id)
    } else {
     // this.message = response.error.message;
    }
  });
}


 

}

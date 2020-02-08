import { Component, OnInit, Inject, Optional } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MainService } from '../../core/services/main.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartList: any = [];
  total_usa_price: number = 0;
  total_loc_price: number = 0;
  selectedCartList: any = [];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    public mainService: MainService,
  ) { }

  ngOnInit() {
    this.getCartList();
  }

  getCartList() {
    var data = {
      "userID": localStorage.getItem('userId'),
      "Flag": "3"
    }
    this.mainService.userCart(data).subscribe(
      res => {
        this.cartList = res['response'];
        this.cartList.forEach(x => {
          console.log(x);
          
        this.total_usa_price += parseFloat(x.usaPrice);
        this.total_loc_price += parseFloat(x.locPrice); 
        })

      }
    )
  }

  removeCart(cart) {
    console.log(cart);

    var data = {
      "cartID": cart.cartID,
      "userID": "",
      "providerID": "",
      "quantity": "",
      "serviceID": "",
      "amount": "",
      "Flag": "2"
    }
    this.mainService.userCart(data).subscribe(
      res => {
        console.log(res);
        this.getCartList();
        this.toastr.success('Cart Added Succesfully!!!', '', {
          timeOut: 3000,
        });
      }
    )

  }

  selectcart(event, cart) {
    if (event.target.checked) {
      cart.dateTimeInBuyNowPage="";
      cart.patientName=localStorage.getItem('userName');
      this.selectedCartList.push(cart);
      console.log(this.selectedCartList);
    }
    else {
      var index = this.selectedCartList.findIndex(y => y.cartID == cart.cartID); 
      console.log(index);
      this.selectedCartList.splice(index, 1);
    }
    localStorage.setItem('selectedCartList', JSON.stringify(this.selectedCartList));
    console.log("Cart 2020==>",this.selectedCartList);
  }

  gotoCheckout() {
    this.router.navigateByUrl('/checkout' );
  }

}

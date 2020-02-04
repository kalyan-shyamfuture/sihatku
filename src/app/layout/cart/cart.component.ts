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
    //    console.log(res);
        this.cartList = res['response'];
      //  console.log("Cart List===>", this.cartList);
        this.cartList.forEach(x => {
   //   console.log(x);

          this.total_usa_price += parseFloat(x.USAPrice);
          this.total_loc_price += parseFloat(x.locPrice);
        })

      }
    )
  }

  removeCart(cart) {
    console.log(cart);
    
  var data = { 
    "cartID":cart.cartID,
	"userID":"",
	"providerID":"",
	"quantity":"",
	"serviceID":"",
	"amount":"",
	"Flag":"2"
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

}

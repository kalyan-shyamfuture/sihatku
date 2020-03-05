import { Component, OnInit } from '@angular/core';
import { MainService } from '../../../core/services/main.service';
@Component({
  selector: 'app-carticon',
  templateUrl: './carticon.component.html',
  styleUrls: ['./carticon.component.scss']
})
export class CarticonComponent implements OnInit {
  cartCount:number;
  constructor(
    public mainService: MainService,
  ) { 
    this.getCartList();
  }

  ngOnInit() {
    
  }

  getCartList() {
    var data = {
      "userID": localStorage.getItem('userId'),
      "Flag": "3"
    }
    this.mainService.userCart(data).subscribe(
      res => {
       // this.cartList = res['response'];
        this.cartCount = res['response'].length;
        ////console.log(this.cartCount);
        

      }
    )
  }

}

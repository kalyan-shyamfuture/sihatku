import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//Services 
import {  UserService} from "../core/services/user.service";
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  ipaddress:any;
  getCurrency:any;
  constructor(
    private router: Router,
    private userService: UserService,
  ) { }

  ngOnInit() {
    if(localStorage.getItem('userType') =='4') {
      // this.router.navigateByUrl('/dashboard/new-oders');
      this.router.navigateByUrl('/dashboard/practioners');
      
    }
    // else {
    //   this.router.navigateByUrl('/home/');
    // }
    this.getIpDetails();
    
  }
  getIpDetails() {
    this.userService.ipDetails().subscribe(
      res => {
        console.log("IP DETAILS==>",res);
        this.ipaddress = res['ip'];
        this.userService.getGEOLocation(this.ipaddress).subscribe(
          res => {
            console.log("Geo Location DETAILS==>",res);
          this.getCurrency = res['currency']['code'];
          localStorage.setItem('getCurrency', this.getCurrency);
          console.log(this.getCurrency);
          
          },
          error => {
            console.log(error.error);
          }
        )
        
      },
      error => {
        console.log(error.error);
      }
    )

  }




}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
    if(localStorage.getItem('userType') =='4') {
      // this.router.navigateByUrl('/dashboard/new-oders');
      this.router.navigateByUrl('/dashboard/practioners/details/63');
      
    }
    // else {
    //   this.router.navigateByUrl('/home/');
    // }
    
  }


}

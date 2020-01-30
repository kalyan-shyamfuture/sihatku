import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-servicesidebar',
  templateUrl: './servicesidebar.component.html',
  styleUrls: ['./servicesidebar.component.scss']
})
export class ServicesidebarComponent implements OnInit {
  loggedIn:boolean;
  constructor( private router: Router,) { }

  ngOnInit() {
  }

  logOut() {
    localStorage.clear();
    this.loggedIn = false;
    this.router.navigate(['/registration']);
  }

  

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from "../../../core/services/user.service";
@Component({
  selector: 'app-servicesidebar',
  templateUrl: './servicesidebar.component.html',
  styleUrls: ['./servicesidebar.component.scss']
})
export class ServicesidebarComponent implements OnInit {
  loggedIn:boolean;
  userId:any;
  profileDetails:any={};
  imgCenterURL:any;
  userName:any;
  constructor( 
    private router: Router,
    public userService: UserService
    ) { }

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
    this.userName =  localStorage.getItem('userName');
    this.getProfile(this.userId);
  }

  logOut() {
    localStorage.clear();
    this.loggedIn = false;
    this.router.navigate(['/registration']);
  }

  getProfile(id) {
    this.userService.getProviderProfile(id).subscribe(
      res => {
        this.profileDetails = res['response']['ProviderDetails'][0];
        console.log("Provider profile DetailsIn side bar==>", this.profileDetails);
        this.imgCenterURL = this.profileDetails.centerLogoFile;
        console.log("Center Logo ==>", this.imgCenterURL);
      },
      error => {
        console.log(error.error);

      }
    )
  }




  

}

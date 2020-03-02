import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { environment } from "../../../environments/environment";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";
import {  forkJoin} from 'rxjs';
//Services 
import {  UserService} from "../../core/services/user.service";
import {  MainService} from "../../core/services/main.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  
})
export class HomeComponent implements OnInit {
  // @ViewChild('owlElement',{static: false}) owlElement: OwlCarousel
  searchTimeout: any;
  showSearch: boolean = false;
  requestForm: FormGroup;
  submitted = false;
  submittedSearch = false;
  bannerList: any = [];
  imageBaseUrl: any;
  visibleKey: boolean = false;
  searchList:any=[];
  selectedService:any;
  serviceId:any;
  locId:any;
  blogList:any=[];
  recentWorkList:any=[];
  topOfferList:any=[];
  specialitylist:any=[];
  mostpopularList:any=[];
  featureProviderList:any=[];

  bannerOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],

    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: false
  }

  topOffersOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText : ["<i class='fa fa-chevron-left'></i>","<i class='fa fa-chevron-right'></i>"],

    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 3
      },
      940: {
        items: 3
      }
    },
    nav: true
  }

  mostpopularOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText : ["<i class='fa fa-chevron-left'></i>","<i class='fa fa-chevron-right'></i>"],

    responsive: {
      0: {
        items: 4
      },
      400: {
        items: 4
      },
      740: {
        items: 4
      },
      940: {
        items: 4
      }
    },
    nav: true
  }

  featuredprovidersOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText : ["<i class='fa fa-chevron-left'></i>","<i class='fa fa-chevron-right'></i>"],

    responsive: {
      0: {
        items: 4
      },
      400: {
        items: 4
      },
      740: {
        items: 4
      },
      940: {
        items: 4
      }
    },
    nav: true
  }


  testimonialOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    navSpeed: 700000,
    navText: ['', ''],

    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: false
  }

  images: any = [];
  catList: any = [];
  citylist:any=[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private mainService: MainService,
    private userService: UserService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.imageBaseUrl = environment.imageEndpoint;

    this.requestForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required]],
    });
    this.getAllData();
    this.getLocation();
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
       // console.log("Location Position===>",position);
        
        var location = position.coords;
        console.log("Location==>",location);
        
        //  this.lat = position.coords.latitude;
        //  this.long = position.coords.longitude;
        // this.getAddress();
      },
        // function (error) {
        error => {
          if (error.code == error.PERMISSION_DENIED)
            console.log("you denied me :-(");
        //    // alert(this.defaultLocationId);
        //    this.locationId = this.defaultLocationId;
        // //  localStorage.setItem('myCurrentLocationId', this.defaultLocationId);
          this.toastr.error('Your location is Disabled. For now your default location will be Howrah you can change location from Dropdown ', '', {
            timeOut: 6000,
          });

        });
    }
  }

  get f() {
    return this.requestForm.controls;
  }

  getAllData() {
    this.spinner.show();
    var forkArray = [];
    forkArray.push(this.mainService.getBannerList())
    forkArray.push(this.mainService.getSpecialityList())
    forkArray.push(this.mainService.getTopOffers())
    forkArray.push(this.mainService.getPopularProcedure())
    forkArray.push(this.mainService.getFeatureProvider())
    forkJoin(forkArray).subscribe(
      (result: any[]) => {
        console.log("All result ==>",result);
        for (var i = 0; i < result.length; i++) {
          if (i == 0) {   
            this.bannerList = result[i]['response'];
          }
          if (i == 1) {
            this.specialitylist = result[i]['response'];
          }
          if (i == 2) {
            this.topOfferList = result[i]['response'];
          }
          
          if (i == 3) {
            this.mostpopularList = result[i]['response'];
            
          }
          if (i == 4) {
            this.featureProviderList = result[i]['response'];
          }
         
        }
        this.visibleKey = true;
        this.spinner.hide();
      },
      err => {
        this.toastr.error('Something went wrong', '', {
          timeOut: 3000,
        });
      }
    )
  }

  gotoProviderList(id) {
    this.router.navigateByUrl('/cliniclist/' + id);
  }

  gotoAllSpeciality() {
    this.router.navigateByUrl('/specialitylist');
  }

  gotoProcedure(id) {
    this.router.navigateByUrl('/procedurelist/' + id);
  }

  requestFeedBack() {
    this.submitted = true;
    if (this.requestForm.invalid) {
      return;
    }
    else {
     var data = {
       "emailid":this.requestForm.value.email,
       "Message":this.requestForm.value.subject
     }
     console.log(data);
     
      this.mainService.requestFeedBack(data).subscribe(
        res => {
          if(res['status']) {
            this.toastr.success(res['response'][0].Message,'Success!!!', {
              timeOut: 3000,
            });
            this.requestForm.reset();
          }
          else {
            this.toastr.error('Failed!!!', 'Sorry Unable to send request', {
              timeOut: 3000,
            });
          }
          this.submitted =false;
        },
        error => {
          console.log(error.error);
          this.submitted =false;
          this.toastr.error('Error!!!', '', {
            timeOut: 3000,
          });
        }
      )
    }
  }




}

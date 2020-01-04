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
  searchForm: FormGroup;
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
        items: 2
      },
      400: {
        items: 2
      },
      740: {
        items: 2
      },
      940: {
        items: 2
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
  // mediaList: any = [
  //   {
  //     image: 'assets/img/banner3.png',
  //   },
  //   {
  //     image: 'assets/img/banner1.png',
  //   },{
  //     image: 'assets/img/banner2.png',
  //   },
  // ];
  

  // topOfferList: any = [
  //   {
  //     image: 'assets/img/top-offers3.png',
  //   },
  //   {
  //     image: 'assets/img/top-offers2.png',
  //   },{
  //     image: 'assets/img/top-offers3.png',
  //   },{
  //     image: 'assets/img/top-offers2.png',
  //   },{
  //     image: 'assets/img/top-offers3.png',
  //   },{
  //     image: 'assets/img/top-offers2.png',
  //   },{
  //     image: 'assets/img/top-offers3.png',
  //   },{
  //     image: 'assets/img/top-offers2.png',
  //   },
  // ];



  featuredprovidersList: any = [
    {
      image: 'assets/img/mostpopular1.png',
    },
    {
      image: 'assets/img/mostpopular2.png',
    },{
      image: 'assets/img/mostpopular3.png',
    },{
      image: 'assets/img/mostpopular4.png',
    },{
      image: 'assets/img/mostpopular1.png',
    },{
      image: 'assets/img/mostpopular2.png',
    },{
      image: 'assets/img/mostpopular3.png',
    },{
      image: 'assets/img/mostpopular4.png',
    },
  ];

  testimonialList:any=[
    {
      "id":"3","author_image":"assets/img/testimonial-img1.jpg",
      "author_name":"Drake Brian","author_designation":"Devguru",
      "video_url":"https:\/\/www.youtube.com\/embed\/JPT3bFIwJYA","description":"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.","created_at":"2019-09-03 07:50:38","modified_at":"2019-09-03 11:30:20","is_deleted":"0","is_active":"1"
  },
    {
      "id":"1",
      "author_image":"assets/img/testimonial-img1.jpg","author_name":"John Doe","author_designation":"Developer","video_url":"https:\/\/www.youtube.com\/embed\/JPT3bFIwJYA","description":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.","created_at":"2019-09-03 06:59:17","modified_at":"2019-09-03 07:54:44","is_deleted":"0","is_active":"1"
    }
   
  ];
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

    this.searchForm = this.formBuilder.group({
      citylist: [''],
      searchtxt: ['', [Validators.required]],
    });
    
    this.getAllData();
    
    this.bannerList = [{
      image: 'assets/img/banner1.jpg',
    },
    {
      image: 'assets/img/banner.jpg',
    },
    {
      image: 'assets/img/banner1.jpg',
    },
    {
      image: 'assets/img/banner.jpg',
    }, {
      image: 'assets/img/banner1.jpg',
    }
    ]
    // this.procedureList();
    // this.getTopOffers();
    // this.getBannerList();
  }



  get f() {
    return this.requestForm.controls;
  }


  // procedureList() {
  //   this.mainService.getProcedureList().subscribe(
  //     res => {
  //       console.log("Result Procedure List==>",res);
  //       this.getTopOffers();
  //     },
  //     error => {
  //       console.log(error.error); 
  //       this.getTopOffers();
  //     }
  //   )
  // }

  // getTopOffers() {
  //   this.mainService.getTopOffers().subscribe(
  //     res => {
  //       console.log("Result Top Offers==>",res);
  //       this.getBannerList();
  //     },
  //     error => {
  //       console.log(error.error); 
  //       this.getBannerList();
  //     }
  //   )
  // }

  // getBannerList() {
  //   this.mainService.getBannerList().subscribe(
  //     res => {
  //       console.log("Result Banner List==>",res);
  //     },
  //     error => {
  //       console.log(error.error); 
  //     }
  //   )
  // }

  getAllData() {
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
            console.log("Banner List==>",this.bannerList);
          }
          if (i == 1) {
            this.specialitylist = result[i]['response'];
            console.log("getSpecialityList List==>",result[i]);
          }
          if (i == 2) {
            this.topOfferList = result[i]['response'];
            console.log("Top Offer List==>",this.topOfferList);
          }
          
          if (i == 3) {
            this.mostpopularList = result[i]['response'];
            console.log("Popular Proce List==>",result[i]);
          }
          if (i == 4) {
            this.featureProviderList = result[i]['response'];
            console.log("Popular Proce List==>",result[i]);
          }
         
        }
        this.visibleKey = true;
      },
      err => {
        this.toastr.error('Something went wrong', '', {
          timeOut: 3000,
        });
      }
    )
  }

  requestFeedBack() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.requestForm.invalid) {
      return;
    }
    else {

      this.spinner.show();
    //  console.log(this.requestForm.value);
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
          
        },
        error => {
          console.log(error.error);
          this.toastr.error('Error!!!', '', {
            timeOut: 3000,
          });
        //  this.spinner.hide();
        }
      )
    }
  }



 

}

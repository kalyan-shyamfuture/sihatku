import { Component, OnInit,TemplateRef } from '@angular/core';
import {  MainService} from "../../../core/services/main.service";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { OwlOptions } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-practioners',
  templateUrl: './practioners.component.html',
  styleUrls: ['./practioners.component.scss']
})
export class PractionersComponent implements OnInit {
  userId:any;
  modalRef: BsModalRef;
  config = {
    animated: true
  };
  practionerList:any=[];

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

  mediaList: any = [
    {
      image: '../../../../assets/img/test.jpg',
    },
    {
      image: '../../../../assets/img/test1.jpg',
    },{
      image: '../../../../assets/img/test2.jpg',
    },
  ];
  constructor(
    private mainService: MainService,
    private modalService: BsModalService
  ) { 
    this.userId = localStorage.getItem('userId');
  }

  ngOnInit() {
    this.getPractionerList()
  }

  getPractionerList() {
    this.mainService.getPractionerList(this.userId).subscribe(
        res => {
          this.practionerList = res['response'];
          console.log("Practioner List==>",this.practionerList);
        },
        error => {
          console.log(error.error); 
        }
    )
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }

}

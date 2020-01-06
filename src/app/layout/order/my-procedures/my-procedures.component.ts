import { Component, OnInit,TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {  MainService} from "../../../core/services/main.service";
import { OwlOptions } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-my-procedures',
  templateUrl: './my-procedures.component.html',
  styleUrls: ['./my-procedures.component.scss']
})
export class MyProceduresComponent implements OnInit {
  procedureList:any=[];
  userId:any;
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
  constructor(
    private modalService: BsModalService,
    private mainService: MainService
    ) {
      this.userId = localStorage.getItem('userId');
     }

  ngOnInit() {
    this.getProcedureList();
  }
  modalRef: BsModalRef;
  config = {
    animated: true
  };

  images: any = [];
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

  getProcedureList() {
    this.mainService.getProcedureList(this.userId).subscribe(
        res => {
          this.procedureList = res['response'];
          console.log("Practioner List==>",this.procedureList);
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

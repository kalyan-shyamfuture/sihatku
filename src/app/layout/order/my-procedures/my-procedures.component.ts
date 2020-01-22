import { Component, OnInit,TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {  MainService} from "../../../core/services/main.service";
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-my-procedures',
  templateUrl: './my-procedures.component.html',
  styleUrls: ['./my-procedures.component.scss']
})
export class MyProceduresComponent implements OnInit {
  procedureList:any=[];
  userId:any;
  procedureId:any;
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
    private mainService: MainService,
    private toastr: ToastrService,
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
          this.procedureList = res['response']['Services'];
          console.log("Provider List==>",this.procedureList);
        },
        error => {
          console.log(error.error); 
        }
    )
  }
 
  openModal(template: TemplateRef<any>) {
    //openModal(template) {
   // console.log(template.split())

    this.modalRef = this.modalService.show(template, this.config);
  }

  deleteProcedure(templateDelete: TemplateRef<any>,procedureId){
    this.procedureId = procedureId;
  // const initialState = { procedureId};
  //this.modalRef = this.modalService.show(templateDelete, {class: 'modal-sm',initialState});
  this.modalRef = this.modalService.show(templateDelete, {class: 'modal-sm'});
  }

  confirmDelete(procedureId) { 
    var data = {
      "ProviderID":this.userId, // Login User Id
      "ServiceID":procedureId
    }
    this.mainService.deleteProcedure(data).subscribe(
      res => {
        console.log(res);
        this.toastr.success(res['response'][0]['msg'], '', {
          timeOut: 3000,
        });
        this.modalRef.hide();
        this.getProcedureList();
      },
      error => {
        console.log(error.error); 
        this.modalRef.hide();
        this.toastr.success('Sorry unable to delete procedure', '', {
          timeOut: 3000,
        });
      }
  )
  }
  decline() {
    this.modalRef.hide();
  }

}

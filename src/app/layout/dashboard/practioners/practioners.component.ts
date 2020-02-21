import { Component, OnInit,TemplateRef } from '@angular/core';
import {  MainService} from "../../../core/services/main.service";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
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
  practionerId:any;
  // bannerOptions: OwlOptions = {
  //   loop: true,
  //   autoplay: true,
  //   mouseDrag: false,
  //   touchDrag: false,
  //   pullDrag: false,
  //   dots: true,
  //   navSpeed: 700,
  //   navText: ['', ''],

  //   responsive: {
  //     0: {
  //       items: 1
  //     },
  //     400: {
  //       items: 1
  //     },
  //     740: {
  //       items: 1
  //     },
  //     940: {
  //       items: 1
  //     }
  //   },
  //   nav: false
  // }

  // mediaList: any = [
  //   {
  //     image: '../../../../assets/img/test.jpg',
  //   },
  //   {
  //     image: '../../../../assets/img/test1.jpg',
  //   },{
  //     image: '../../../../assets/img/test2.jpg',
  //   },
  // ];
  constructor(
    private mainService: MainService,
    private modalService: BsModalService,
    private toastr: ToastrService,
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

  setDefaultPic() {
   console.log('Image Not Found');
  }


  deletePractioner(templateDelete: TemplateRef<any>,practionerId){
    this.practionerId = practionerId;
  this.modalRef = this.modalService.show(templateDelete, {class: 'modal-sm'});
  }

  confirmDelete(practionerId) {
    // var data = {
    //   "ProviderID":this.userId, // Login User Id
    //   "ServiceID":practionerId
    // }

    //console.log(data);
    
    this.mainService.deletePractioner(practionerId,this.userId).subscribe(
      res => {
        console.log(res);
        this.toastr.success(res['response'][0]['msg'], '', {
          timeOut: 3000,
        });
        this.modalRef.hide();
        this.getPractionerList();
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

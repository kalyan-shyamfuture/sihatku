import { Component, OnInit,TemplateRef } from '@angular/core';
import {  MainService} from "../../../../core/services/main.service";
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-practioners-details',
  templateUrl: './practioners-details.component.html',
  styleUrls: ['./practioners-details.component.scss']
})
export class PractionersDetailsComponent implements OnInit {
  userId:any;
  pracId:any;
  practionerDetails:any={};
  modalRef: BsModalRef;
  practionerId:any;
  practionerSpeciality:any=[];
  constructor(
    private mainService: MainService,
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private router: Router,
  ) { 
  
  }

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
    this.route.params.subscribe(routeParams => {
      console.log(routeParams);
      this.pracId = routeParams.id;
      this.getPractionerDetails(this.pracId)
    });
   
  }

  getPractionerDetails(id) {
    this.mainService.getPractionerDetails(id).subscribe(
      res => {
        this.practionerDetails = res['response']['PractionerDetails'][0];
        this.practionerSpeciality =this.practionerDetails['Speciality']
        console.log("Practioner Details==>",this.practionerDetails);
        console.log(this.practionerSpeciality);
        
      },
      error => {
        console.log(error.error); 
      }
  )
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

   // console.log(data);
    
    this.mainService.deletePractioner(practionerId,this.userId).subscribe(
      res => {
        console.log(res);
        this.toastr.success(res['response'][0]['msg'], '', {
          timeOut: 3000,
        });
        this.modalRef.hide();
      //  this.getPractionerList();
      this.router.navigateByUrl('/dashboard/practioners');
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

  editPractioner(id) {
    this.router.navigateByUrl('/dashboard/practioners/edit/'+id);
  }

}

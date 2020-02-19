import { Component, OnInit } from '@angular/core';
import {  MainService} from "../../../../core/services/main.service";
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-practioners-details',
  templateUrl: './practioners-details.component.html',
  styleUrls: ['./practioners-details.component.scss']
})
export class PractionersDetailsComponent implements OnInit {
  userId:any;
  practionerDetails:any;
  constructor(
    private mainService: MainService,
    private modalService: BsModalService,
    private toastr: ToastrService,
  ) { 
  
  }

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
    this.getPractionerDetails(this.userId)
  }

  getPractionerDetails(id) {
    this.mainService.getPractionerDetails(id).subscribe(
      res => {
        this.practionerDetails = res['response'][0];
        console.log("Practioner Details==>",this.practionerDetails);
      },
      error => {
        console.log(error.error); 
      }
  )
  }

}

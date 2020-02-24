import { Component, OnInit,TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from "@angular/router";
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  modalRef: BsModalRef;
  message: string;
  loggedIn:boolean;
  userId:any;
  providerType:any;
  constructor( 
    private modalService: BsModalService,
     private router: Router) { }

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
    this.providerType = localStorage.getItem('providerType');
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }
 
  confirm(): void {
    this.modalRef.hide();
    localStorage.clear();
    this.loggedIn = false;
    this.router.navigate(['/home']);
  }
 
  decline(): void {
    this.message = 'Declined!';
    this.modalRef.hide();
  }

}

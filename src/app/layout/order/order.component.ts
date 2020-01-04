import { Component, OnInit,TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from "@angular/router";
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  modalRef: BsModalRef;
  message: string;
  loggedIn:boolean;
  constructor( 
    private modalService: BsModalService,
     private router: Router) { }

  ngOnInit() {
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

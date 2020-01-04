import { Component, OnInit } from '@angular/core';
import {  MainService} from "../../../core/services/main.service";
@Component({
  selector: 'app-practioners',
  templateUrl: './practioners.component.html',
  styleUrls: ['./practioners.component.scss']
})
export class PractionersComponent implements OnInit {
  userId:any;
  constructor(
    private mainService: MainService,
  ) { 
    this.userId = localStorage.getItem('userId');
  }

  ngOnInit() {
    this.getPractionerList()
  }

  getPractionerList() {
    this.mainService.getPractionerList(this.userId).subscribe(
        res => {
          console.log("Practioner List==>",res);
        },
        error => {
          console.log(error.error); 
        }
    )
  }

}

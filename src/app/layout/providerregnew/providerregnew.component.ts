import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-providerregnew',
  templateUrl: './providerregnew.component.html',
  styleUrls: ['./providerregnew.component.scss']
})
export class ProviderregnewComponent implements OnInit {
  isShow :boolean=true;
  constructor() { }

  ngOnInit() {
  }

  showNext() {
    this.isShow =false;
  }
  ShowPrev() {
    this.isShow =true;
  }

}

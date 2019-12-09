import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.scss']
})
export class AboutusComponent implements OnInit {

  aboutOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],

    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 3
      },
      740: {
        items: 3
      },
      940: {
        items: 3
      }
    },
    nav: true
  }



  mediaList: any = [
    {
      image: 'assets/img/brand-1.jpg',
    },
    {
      image: 'assets/img/brand-4.jpg',
    },
    {
      image: 'assets/img/brand-2.jpg',
    },
    {
      image: 'assets/img/brand-1.jpg',
    }, {
      image: 'assets/img/brand-3.jpg',
    },
    {
      image: 'assets/img/brand-4.jpg',
    },
    {
      image: 'assets/img/brand-2.jpg',
    },
    {
      image: 'assets/img/brand-1.jpg',
    }, {
      image: 'assets/img/brand-3.jpg',
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}

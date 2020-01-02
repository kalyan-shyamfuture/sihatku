import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SigninComponent } from '../signin/signin.component';
import { UserService } from "../../../core/services/user.service";
import { Router, NavigationEnd } from '@angular/router';
import { MainService } from "../../../core/services/main.service";
import { environment } from "../../../../environments/environment";
import { filter } from 'rxjs/operators';
import { ScrollToAnimationEasing, ScrollToOffsetMap } from '@nicky-lenaers/ngx-scroll-to';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('expandCollapse', [
      state('open', style({
        height: '*',
        margin: '*',
        padding: '*',
        visibility: 'visible',
        opacity: '1'
      })),
      state('close', style({
        height: '0px',
        margin: '0px',
        padding: '0px',
        visibility: 'hidden',
        opacity: '0'
      })),
      transition('open <=> close', animate(300))
    ])
  ]
})
export class HeaderComponent implements OnInit {
  @ViewChild('topNav', { static: true }) public topNav: ElementRef;
  public openCloseAnim: string = 'open';
  loggedIn: any;
  userName: any;
  userEmail:any;
  catList: any = [];
  settingList:any={};
  imageBaseUrl: any;
  locId:any;
  customer_cart_data:any;
  cartCount:any;
  userType:any;
  public ngxScrollToDuration: number;
  constructor(
    public dialog: MatDialog,
    private router: Router,
    public userService: UserService,
    private mainService: MainService,
  ) {
    this.imageBaseUrl = environment.imageEndpoint;
    mainService.getCartNumberStatus.subscribe(status => this.cartNumberStatus(status));
    userService.getLoggedInStatus.subscribe(status => this.changeStatus(status));
    router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe(e => {
      this.closeNav();
      if (localStorage.getItem('cart')) {
        this.customer_cart_data = JSON.parse(localStorage.getItem('cart'));
        this.cartCount = this.customer_cart_data.length;
      } else {
        this.customer_cart_data = [];
        this.cartCount = 0;
      }
      // logger.log(e.id, e.url);
    });
    this.ngxScrollToDuration = 2000;
  }

  ngOnInit() {
    this.loadUserInfo();
  }

  expandClose() {
    if (this.openCloseAnim === 'open') {
      this.closeNav();
    } else {
      this.expandNav();
    }
  }
  closeNav() {
    setTimeout(() => {
      this.topNav.nativeElement.classList.remove('show');
    }, 500);
    this.openCloseAnim = 'close';
  }
  expandNav() {
    this.topNav.nativeElement.classList.add('show');
    this.openCloseAnim = 'open';
  }


  cartNumberStatus(status: boolean) {
    if (status) {
      if (localStorage.getItem("cart")) {
        this.cartCount = JSON.parse(localStorage.getItem("cart")).length;
      }
      else {
        this.cartCount = 0;
      }

   
    }
  }

  openSigninModal() {
    let dialogRef = this.dialog.open(SigninComponent, {
      width: '626px',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
    })
  }

  private changeStatus(status: boolean) {
    if (status) {
      this.loadUserInfo();
    }
  }


  loadUserInfo() {
    if (localStorage.getItem('isLoggedin')) {

      // localStorage.setItem('isLoggedin', 'true');
      // localStorage.setItem('userId', res['UserID']);
      // localStorage.setItem('userName', res['Username']);
      // localStorage.setItem('userEmail', res['EmailID']);
      // localStorage.setItem('userContact', res['Phone']);

      this.loggedIn = true;
      this.userName = localStorage.getItem('userName');
      this.userEmail  = localStorage.getItem('userEmail');

    }
    else {
      this.loggedIn = false;
    }
  }

  logOut() {
    localStorage.clear();
    this.loggedIn = false;
    this.router.navigate(['/']);
  }


}


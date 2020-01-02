import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ServiceproviderSigninComponent } from '../serviceprovider-signin/serviceprovider-signin.component';
import { trigger, state, style, animate, transition } from '@angular/animations';


@Component({
  selector: 'app-header-provider',
  templateUrl: './header-provider.component.html',
  styleUrls: ['./header-provider.component.scss'],
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
export class HeaderProviderComponent implements OnInit {
  @ViewChild('topNav', { static: true }) public topNav: ElementRef;
  public openCloseAnim: string = 'open';

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
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

  openSigninModal() {
    console.log('hi');
    
    let dialogRef = this.dialog.open(ServiceproviderSigninComponent, {
      width: '626px',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
    })
  }


}

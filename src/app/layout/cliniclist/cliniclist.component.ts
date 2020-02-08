import { Component, OnInit, Inject, Optional } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SigninComponent } from '../../core/components/signin/signin.component';
import { MainService } from '../../core/services/main.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-cliniclist',
  templateUrl: './cliniclist.component.html',
  styleUrls: ['./cliniclist.component.scss']
})
export class CliniclistComponent implements OnInit {
  serviceId: any;
  clinicList: any = [];
  cartCount:number;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public mainService: MainService,
    private toastr: ToastrService,
    public dialog: MatDialog,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.route.params.subscribe(routeParams => {
      this.serviceId = routeParams.id;
      this.getclinicList(routeParams.id)
    });
  }

  ngOnInit() {
    this.getCartList();
  }

  getclinicList(id) {
    var data = {
      "ServiceID": id
    }
    this.mainService.getProviderList(data).subscribe(
      res => {
        console.log(res);
        this.clinicList = res['response'];
        console.log(this.clinicList);

      }
    )

  }

  addtoCart(details) {
    if (localStorage.getItem('userId')) {
      var data = {
        "userID": localStorage.getItem('userId'),
        "providerID": details.providerID,
        "quantity": "1",
        "serviceID": this.serviceId,
        "Flag": "1"
      }
      this.mainService.userCart(data).subscribe(
        res => {
          console.log(res);
          this.getCartList();
          // this.clinicList = res['response'];
          //console.log(this.clinicList);
          this.toastr.success('Cart Added Succesfully!!!', '', {
            timeOut: 3000,
          });
        }
      )
    }
    else {
      const dialogRef = this.dialog.open(SigninComponent, {
        width: '525px',
        data: {}
      });
      dialogRef.afterClosed().subscribe(result => {
      });

    }
  }

  gotoDetails(id) {
    this.router.navigateByUrl('/proceduredetails/' + this.serviceId+'/'+id);
  }

  getCartList() {
    var data = {
      "userID": localStorage.getItem('userId'),
      "Flag": "3"
    }
    this.mainService.userCart(data).subscribe(
      res => {
       // this.cartList = res['response'];
        this.cartCount = res['response'].length;
        console.log(this.cartCount);
        

      }
    )
  }



}

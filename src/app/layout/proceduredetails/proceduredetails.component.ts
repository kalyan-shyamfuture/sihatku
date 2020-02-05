import { Component, OnInit, Inject, Optional } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MainService } from '../../core/services/main.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-proceduredetails',
  templateUrl: './proceduredetails.component.html',
  styleUrls: ['./proceduredetails.component.scss']
})
export class ProceduredetailsComponent implements OnInit {
  providerDetails:any={};
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    public mainService: MainService,
  ) {
    this.route.params.subscribe(routeParams => {
      console.log(routeParams);
      // this.serviceId = routeParams.id;
      // this.getclinicList(routeParams.id)
    });
   }

  ngOnInit() {
    this.getproviderDetails();
  }

  getproviderDetails() {
    var data = {
      "providerId": localStorage.getItem('userId'),
      "procedureId": "3"
    }
    this.mainService.providerDetails(data).subscribe(
      res => {
      console.log(res);
      
        })

      }


}

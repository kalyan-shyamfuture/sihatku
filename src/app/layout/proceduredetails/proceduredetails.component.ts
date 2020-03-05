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
  providerDetails: any = {};
  providerId: any;
  procedureId: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    public mainService: MainService,
  ) {
    this.route.params.subscribe(routeParams => {
      //console.log(routeParams);
      this.providerId = routeParams.sid;
      this.procedureId = routeParams.pid;
      this.getProcedureDetails(this.providerId, this.procedureId)
    });
  }

  ngOnInit() {
    // this.getproviderDetails();
  }

  getProcedureDetails(providerId, procedureId) {
    var data = {
      "ProviderId": providerId,
      "ServiceId": procedureId
    }
    this.mainService.providerDetails(data).subscribe(
      res => {
        //console.log("ProcedureDetails==>", res);
      })
  }


}

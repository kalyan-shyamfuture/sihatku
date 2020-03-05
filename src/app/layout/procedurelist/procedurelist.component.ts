import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MainService } from '../../core/services/main.service';

@Component({
  selector: 'app-procedurelist',
  templateUrl: './procedurelist.component.html',
  styleUrls: ['./procedurelist.component.scss']
})
export class ProcedurelistComponent implements OnInit {
  procedureList:any=[];
  specialityId:any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public mainService: MainService,
  ) { 
    this.route.params.subscribe(routeParams => {
      //console.log(routeParams);
      this.specialityId = routeParams.id;
      this.getProcedureDetails(this.specialityId)
    });
  }

  ngOnInit() {

  }

  getProcedureDetails(id) {
    this.mainService.getProcedurebySpeciality(id).subscribe(
      res => {
        //console.log("procedure List==>", res);
        this.procedureList = res['response'];
      })
  }

  gotoProviderList(id) {
    this.router.navigateByUrl('/cliniclist/' + id);
  }


}

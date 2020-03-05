import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MainService } from '../../core/services/main.service';
@Component({
  selector: 'app-specialitylist',
  templateUrl: './specialitylist.component.html',
  styleUrls: ['./specialitylist.component.scss']
})
export class SpecialitylistComponent implements OnInit {
  specialitylist:any=[];
  constructor(
    private router: Router,
    public mainService: MainService,
  ) { }

  ngOnInit() {
    this.getSpecialityList();
  }

  getSpecialityList() {
    this.mainService.getSpecialityList().subscribe(
      res => {
        //console.log("Speciality List==>", res);
        this.specialitylist = res['response'];
      })
  }

  gotoProcedure(id) {
    this.router.navigateByUrl('/procedurelist/' + id);
  }


}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CliniclistComponent } from '../cliniclist/cliniclist.component';

const routes: Routes = [
  {
    path: '',
    component: CliniclistComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CliniclistRoutingModule { }

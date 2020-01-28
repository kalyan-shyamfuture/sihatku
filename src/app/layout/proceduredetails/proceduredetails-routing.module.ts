import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProceduredetailsComponent } from './proceduredetails.component';

const routes: Routes = [
  {
    path: '',
    component: ProceduredetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProceduredetailsRoutingModule { }

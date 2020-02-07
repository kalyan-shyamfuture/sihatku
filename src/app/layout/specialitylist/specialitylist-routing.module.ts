import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SpecialitylistComponent } from './specialitylist.component';
const routes: Routes = [
  {
    path: '',
    component: SpecialitylistComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpecialitylistRoutingModule { }

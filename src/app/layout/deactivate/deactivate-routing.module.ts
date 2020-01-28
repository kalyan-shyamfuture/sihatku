import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeactivateComponent } from './deactivate.component';

const routes: Routes = [
  {
    path: '',
    component: DeactivateComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeactivateRoutingModule { }

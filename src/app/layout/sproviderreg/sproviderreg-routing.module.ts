import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SproviderregComponent} from './sproviderreg.component';
const routes: Routes = [
  {
    path: '',
    component: SproviderregComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SproviderregRoutingModule { }

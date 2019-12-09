import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SproviderregRoutingModule } from './sproviderreg-routing.module';
import { SproviderregComponent } from './sproviderreg.component';


@NgModule({
  declarations: [SproviderregComponent],
  imports: [
    CommonModule,
    SproviderregRoutingModule
  ]
})
export class SproviderregModule { }

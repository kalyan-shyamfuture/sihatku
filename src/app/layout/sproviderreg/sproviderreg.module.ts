import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SproviderregRoutingModule } from './sproviderreg-routing.module';
import { SproviderregComponent } from './sproviderreg.component';

// core
import { CoreModule } from '../../core/core.module';
@NgModule({
  declarations: [SproviderregComponent],
  imports: [
    CommonModule,
    SproviderregRoutingModule,
    CoreModule
  ]
})
export class SproviderregModule { }

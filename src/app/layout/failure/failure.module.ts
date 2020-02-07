import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FailureRoutingModule } from './failure-routing.module';
import { FailureComponent } from './failure.component';
// core
import { CoreModule } from '../../core/core.module';

@NgModule({
  declarations: [FailureComponent],
  imports: [
    CommonModule,
    FailureRoutingModule,
    CoreModule
  ]
})
export class FailureModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChangepasswordRoutingModule } from './changepassword-routing.module';
import { ChangepasswordComponent } from './changepassword.component';
// core
import { CoreModule } from '../../core/core.module';

@NgModule({
  declarations: [ChangepasswordComponent],
  imports: [
    CommonModule,
    ChangepasswordRoutingModule,
    CoreModule
  ]
})
export class ChangepasswordModule { }

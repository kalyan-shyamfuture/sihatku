import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CliniclistRoutingModule } from './cliniclist-routing.module';
import { CliniclistComponent } from './cliniclist.component';
import { CoreModule } from '../../core/core.module';

@NgModule({
  declarations: [CliniclistComponent],
  imports: [
    CommonModule,
    CliniclistRoutingModule,
    CoreModule
  ]
})
export class CliniclistModule { }

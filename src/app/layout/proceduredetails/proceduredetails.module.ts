import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProceduredetailsRoutingModule } from './proceduredetails-routing.module';
import { ProceduredetailsComponent } from './proceduredetails.component';
import { CoreModule } from '../../core/core.module';

@NgModule({
  declarations: [ProceduredetailsComponent],
  imports: [
    CommonModule,
    ProceduredetailsRoutingModule,
    CoreModule
  ]
})
export class ProceduredetailsModule { }

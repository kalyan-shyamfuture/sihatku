import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProcedurelistRoutingModule } from './procedurelist-routing.module';
import { ProcedurelistComponent } from './procedurelist.component';
import { CoreModule } from '../../core/core.module';

@NgModule({
  declarations: [ProcedurelistComponent],
  imports: [
    CommonModule,
    ProcedurelistRoutingModule,
    CoreModule
  ]
})
export class ProcedurelistModule { }

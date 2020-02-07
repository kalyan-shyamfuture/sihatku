import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpecialitylistRoutingModule } from './specialitylist-routing.module';
import { SpecialitylistComponent } from './specialitylist.component';
import { CoreModule } from '../../core/core.module';

@NgModule({
  declarations: [SpecialitylistComponent],
  imports: [
    CommonModule,
    SpecialitylistRoutingModule,
    CoreModule
  ]
})
export class SpecialitylistModule { }

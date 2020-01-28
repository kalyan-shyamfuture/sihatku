import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeactivateRoutingModule } from './deactivate-routing.module';
import { DeactivateComponent } from './deactivate.component';


@NgModule({
  declarations: [DeactivateComponent],
  imports: [
    CommonModule,
    DeactivateRoutingModule
  ]
})
export class DeactivateModule { }

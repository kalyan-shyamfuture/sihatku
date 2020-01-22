import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProviderregnewRoutingModule } from './providerregnew-routing.module';
import { ProviderregnewComponent } from './providerregnew.component';
// core
import { CoreModule } from '../../core/core.module';

@NgModule({
  declarations: [ProviderregnewComponent],
  imports: [
    CommonModule,
    ProviderregnewRoutingModule,
    CoreModule
  ]
})
export class ProviderregnewModule { }

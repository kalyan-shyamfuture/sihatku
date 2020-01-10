import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProviderregRoutingModule } from './providerreg-routing.module';
import { ProviderregComponent } from './providerreg.component';
// core
import { CoreModule } from '../../core/core.module';

@NgModule({
  declarations: [ProviderregComponent],
  imports: [
    CommonModule,
    ProviderregRoutingModule,
    CoreModule
  ]
})
export class ProviderregModule { }

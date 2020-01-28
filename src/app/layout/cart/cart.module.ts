import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart.component';

import { CoreModule } from '../../core/core.module';

@NgModule({
  declarations: [CartComponent],
  imports: [
    CommonModule,
    CartRoutingModule,
    CoreModule
  ]
})
export class CartModule { }

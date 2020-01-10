import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { OrderComponent } from './order.component';
import { PractionersComponent } from './practioners/practioners.component';
import { MyProceduresComponent } from './my-procedures/my-procedures.component';
import { NewOdersComponent } from './new-oders/new-oders.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { MyPaymentsComponent } from './my-payments/my-payments.component';
import { ConsumerReviewComponent } from './consumer-review/consumer-review.component';
import { SwitchToConsumerComponent } from './switch-to-consumer/switch-to-consumer.component';
import { InboxComponent } from './inbox/inbox.component';
import { ExploreSihatkuComponent } from './explore-sihatku/explore-sihatku.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
// core
import { CoreModule } from '../../core/core.module';


@NgModule({
  declarations: [OrderComponent, PractionersComponent, MyProceduresComponent, NewOdersComponent, OrderHistoryComponent, MyPaymentsComponent, ConsumerReviewComponent, SwitchToConsumerComponent, InboxComponent, ExploreSihatkuComponent,MyProfileComponent],
  imports: [
    CommonModule,
    OrderRoutingModule,
    CoreModule
  ]
})
export class OrderModule { }

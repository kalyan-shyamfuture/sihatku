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
import { PractionersAddComponent } from './practioners/practioners-add/practioners-add.component';
import { PractionersDetailsComponent } from './practioners/practioners-details/practioners-details.component';
import { PractionersEditComponent } from './practioners/practioners-edit/practioners-edit.component';
import { MyProceduresAddComponent } from './my-procedures/my-procedures-add/my-procedures-add.component';
import { MyProceduresEditComponent } from './my-procedures/my-procedures-edit/my-procedures-edit.component';
import { MyProceduresDetailsComponent } from './my-procedures/my-procedures-details/my-procedures-details.component';


@NgModule({
  declarations: [OrderComponent, PractionersComponent, MyProceduresComponent, NewOdersComponent, OrderHistoryComponent, MyPaymentsComponent, ConsumerReviewComponent, SwitchToConsumerComponent, InboxComponent, ExploreSihatkuComponent,MyProfileComponent, PractionersAddComponent, PractionersDetailsComponent, PractionersEditComponent, MyProceduresAddComponent, MyProceduresEditComponent, MyProceduresDetailsComponent],
  imports: [
    CommonModule,
    OrderRoutingModule,
    CoreModule
  ]
})
export class OrderModule { }

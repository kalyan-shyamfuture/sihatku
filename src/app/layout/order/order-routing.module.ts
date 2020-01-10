import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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


const routes: Routes = [
  {
  path: '',
  component: OrderComponent,
  children:[
    {
      path: '',
      redirectTo: 'practioners',
      pathMatch: 'full'
    },
    {
      path: 'practioners',
      component:PractionersComponent,
    },
    {
      path:'my-procedures', 
      component:MyProceduresComponent,
    },
    {
      path:'new-oders', 
      component:NewOdersComponent,
    },
    {
      path:'order-history', 
      component:OrderHistoryComponent,
    },
    {
      path:'my-payments', 
      component:MyPaymentsComponent,
    },
    {
      path:'consumer-Review', 
      component:ConsumerReviewComponent,
    },
    {
      path:'switch-toConsumer', 
      component:SwitchToConsumerComponent,
    },
    {
      path:'inbox', 
      component:InboxComponent,
    },
    {
      path:'explore-Sihatku', 
      component:ExploreSihatkuComponent,
    },
    {
      path:'myProfile', 
      component:MyProfileComponent,
    },
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }

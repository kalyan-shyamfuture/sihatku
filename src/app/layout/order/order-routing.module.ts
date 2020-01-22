import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderComponent } from './order.component';
import { NewOdersComponent } from './new-oders/new-oders.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { MyPaymentsComponent } from './my-payments/my-payments.component';
import { ConsumerReviewComponent } from './consumer-review/consumer-review.component';
import { SwitchToConsumerComponent } from './switch-to-consumer/switch-to-consumer.component';
import { InboxComponent } from './inbox/inbox.component';
import { ExploreSihatkuComponent } from './explore-sihatku/explore-sihatku.component';
import { MyProfileComponent } from './my-profile/my-profile.component';

//Practioner 
import { PractionersComponent } from './practioners/practioners.component';
import { PractionersAddComponent } from './practioners/practioners-add/practioners-add.component';
import { PractionersDetailsComponent } from './practioners/practioners-details/practioners-details.component';
import { PractionersEditComponent } from './practioners/practioners-edit/practioners-edit.component';

//Procedure 
import { MyProceduresComponent } from './my-procedures/my-procedures.component';
import { MyProceduresAddComponent } from './my-procedures/my-procedures-add/my-procedures-add.component';
import { MyProceduresDetailsComponent } from './my-procedures/my-procedures-details/my-procedures-details.component';
import { MyProceduresEditComponent } from './my-procedures/my-procedures-edit/my-procedures-edit.component';

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
      path: 'practioners/add',
      component:PractionersAddComponent,
    },
    {
      path: 'practioners/details/:id',
      component:PractionersDetailsComponent,
    },
    {
      path: 'practioners/edit/:id',
      component:PractionersEditComponent,
    },
    {
      path:'my-procedures', 
      component:MyProceduresComponent,
    },
    {
      path:'my-procedures/add', 
      component:MyProceduresAddComponent,
    },
    {
      path:'my-procedures/details/:id', 
      component:MyProceduresDetailsComponent,
    },
    {
      path:'my-procedures/edit', 
      component:MyProceduresEditComponent,
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

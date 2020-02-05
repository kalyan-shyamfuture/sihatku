import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { AuthGuard } from '../core/guard/auth.guard';
const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: "full" },
      { path: '/', redirectTo: 'home', pathMatch: "full" },
      { path: 'home', loadChildren: './home/home.module#HomeModule' },
      { path: 'registration', loadChildren: './sproviderreg/sproviderreg.module#SproviderregModule' },
      { path: 'contactus', loadChildren: './contactus/contactus.module#ContactusModule' },
      { path: 'profile', loadChildren: './profile/profile.module#ProfileModule',canActivate: [AuthGuard] },
      { path: 'cms', loadChildren: './cms/cms.module#CmsModule' },
      { path: 'order', loadChildren: './order/order.module#OrderModule',canActivate: [AuthGuard] },
      { path: 'providerreg', loadChildren: './providerreg/providerreg.module#ProviderregModule' },
      { path: 'providerregnew', loadChildren: './providerregnew/providerregnew.module#ProviderregnewModule' },
      { path: 'cart', loadChildren: './cart/cart.module#CartModule' },
      { path: 'proceduredetails/:sid/:pid', loadChildren: './proceduredetails/proceduredetails.module#ProceduredetailsModule' },
      { path: 'changepassword', loadChildren: './changepassword/changepassword.module#ChangepasswordModule',canActivate: [AuthGuard] },
      { path: 'deactivate', loadChildren: './deactivate/deactivate.module#DeactivateModule',canActivate: [AuthGuard] },
      { path: 'cliniclist/:id', loadChildren: './cliniclist/cliniclist.module#CliniclistModule'},
      { path: 'payment', loadChildren: './payment/payment.module#PaymentModule'},
      { path: 'checkout', loadChildren: './checkout/checkout.module#CheckoutModule'},
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }

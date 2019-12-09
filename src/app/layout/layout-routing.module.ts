import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: "full" },
      { path: '/', redirectTo: 'home', pathMatch: "full" },
      { path: 'home', loadChildren: './home/home.module#HomeModule' },
      { path: 'registration', loadChildren: './sproviderreg/sproviderreg.module#SproviderregModule' },
      { path: 'aboutus', loadChildren: './aboutus/aboutus.module#AboutusModule' },
      { path: 'contactus', loadChildren: './contactus/contactus.module#ContactusModule' },
      { path: 'profile', loadChildren: './profile/profile.module#ProfileModule' },
      { path: 'cms', loadChildren: './cms/cms.module#CmsModule' },
      { path: 'order', loadChildren: './order/order.module#OrderModule' }

      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }

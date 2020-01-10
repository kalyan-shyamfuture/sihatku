import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProviderregComponent} from './providerreg.component';

const routes: Routes = [
  {
    path: '',
    component: ProviderregComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProviderregRoutingModule { }

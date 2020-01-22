import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProviderregnewComponent} from './providerregnew.component';

const routes: Routes = [
  {
    path: '',
    component: ProviderregnewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProviderregnewRoutingModule { }

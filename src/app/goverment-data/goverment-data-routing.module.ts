import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StateCardsComponent } from './components/state-cards/state-cards.component';

const routes: Routes = [
  { path: '',  component: StateCardsComponent,data : { title: 'Live Data from MOHFW India Website on India Covid-19'}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GovermentDataRoutingModule { }

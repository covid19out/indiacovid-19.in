import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StateCardsComponent } from './components/state-cards/state-cards.component';

const routes: Routes = [
  { path: '',  component: StateCardsComponent,data : { title: 'Covid-19 India Statewise Analytics and Dashboard'}  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GovermentDataRoutingModule { }

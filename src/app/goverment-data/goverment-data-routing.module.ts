import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StateCardsComponent } from './components/state-cards/state-cards.component';

const routes: Routes = [
  { path: '',  component: StateCardsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GovermentDataRoutingModule { }

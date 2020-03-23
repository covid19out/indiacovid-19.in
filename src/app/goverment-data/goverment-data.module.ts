import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GovermentDataRoutingModule } from './goverment-data-routing.module';
import { StateCardsComponent } from './components/state-cards/state-cards.component';
import { CounterComponent } from './components/counter/counter.component';


@NgModule({
  declarations: [StateCardsComponent, CounterComponent],
  imports: [
    CommonModule,
    GovermentDataRoutingModule
  ]
})
export class GovermentDataModule { }

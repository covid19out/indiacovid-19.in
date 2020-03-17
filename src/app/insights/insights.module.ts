import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InsightsRoutingModule } from './insights-routing.module';
import { InsightsComponent } from './components/insights/insights.component';
import { CurrentCaseComponent } from './components/current-case/current-case.component';
import { DischargedCaseComponent } from './components/discharged-case/discharged-case.component';


@NgModule({
  declarations: [InsightsComponent, CurrentCaseComponent, DischargedCaseComponent],
  imports: [
    CommonModule,
    InsightsRoutingModule
  ]
})
export class InsightsModule { }

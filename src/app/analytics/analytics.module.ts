import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';

import { AnalyticsRoutingModule } from './analytics-routing.module';
import { AnalyticsComponent } from './components/analytics/analytics.component';
import { ConfirmedComponent } from './components/confirmed/confirmed.component';
import { RecoveredComponent } from './components/recovered/recovered.component';
import { SymptomaticComponent } from './components/symptomatic/symptomatic.component';
import { IntensiveCareCasesComponent } from './components/intensive-care-cases/intensive-care-cases.component';


@NgModule({
  declarations: [AnalyticsComponent, ConfirmedComponent, RecoveredComponent, SymptomaticComponent, IntensiveCareCasesComponent],
  imports: [
    CommonModule,
    AnalyticsRoutingModule,
    ChartsModule
  ]
})
export class AnalyticsModule { }

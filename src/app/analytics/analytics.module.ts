import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';
import { BsDatepickerModule } from 'ngx-bootstrap';

import { AnalyticsRoutingModule } from './analytics-routing.module';
import { AnalyticsComponent } from './components/analytics/analytics.component';
import { ConfirmedComponent } from './components/confirmed/confirmed.component';
import { RecoveredComponent } from './components/recovered/recovered.component';
import { SymptomaticComponent } from './components/symptomatic/symptomatic.component';
import { IntensiveCareCasesComponent } from './components/intensive-care-cases/intensive-care-cases.component';
import { CityWiseCardsComponent } from './components/city-wise-cards/city-wise-cards.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { StateWiseCardsComponent } from './components/state-wise-cards/state-wise-cards.component';


@NgModule({
  declarations: [AnalyticsComponent, ConfirmedComponent, RecoveredComponent, SymptomaticComponent, IntensiveCareCasesComponent, CityWiseCardsComponent, StateWiseCardsComponent],
  imports: [
    CommonModule,
    AnalyticsRoutingModule,
    ChartsModule,
    SharedModule,
    BsDatepickerModule.forRoot(),
  ]
})
export class AnalyticsModule { }

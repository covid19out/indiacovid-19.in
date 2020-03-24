import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfirmedComponent } from './components/confirmed/confirmed.component';
import { RecoveredComponent } from './components/recovered/recovered.component';
import { SymptomaticComponent } from './components/symptomatic/symptomatic.component';
import { IntensiveCareCasesComponent } from './components/intensive-care-cases/intensive-care-cases.component';
import { CityWiseCardsComponent } from './components/city-wise-cards/city-wise-cards.component';

import { AnalyticsComponent } from './components/analytics/analytics.component';

const routes: Routes = [
  { path: '',  component: AnalyticsComponent },
  { path: 'confirmed',  component: ConfirmedComponent },
  { path: 'recovered',  component: RecoveredComponent },
  { path: 'symptomatic',  component: SymptomaticComponent },
  { path: 'intensive_care_cases',  component: IntensiveCareCasesComponent },
  { path: 'city_wise_cases',  component: CityWiseCardsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnalyticsRoutingModule { }

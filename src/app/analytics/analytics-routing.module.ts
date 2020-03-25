import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfirmedComponent } from './components/confirmed/confirmed.component';
import { RecoveredComponent } from './components/recovered/recovered.component';
import { SymptomaticComponent } from './components/symptomatic/symptomatic.component';
import { IntensiveCareCasesComponent } from './components/intensive-care-cases/intensive-care-cases.component';
import { CityWiseCardsComponent } from './components/city-wise-cards/city-wise-cards.component';
import { StateWiseCardsComponent } from './components/state-wise-cards/state-wise-cards.component';
//import { AnalyticsComponent } from './components/analytics/analytics.component';

const routes: Routes = [
  { path: '',  component: StateWiseCardsComponent ,data : { title: 'Covid-19 India Statewise Analytics and Dashboard'}},
  { path: 'confirmed',  component: ConfirmedComponent ,data : { title: 'Covid-19 India Statewise Analytics and Dashboard'}},
  { path: 'recovered',  component: RecoveredComponent ,data : { title: 'Covid-19 India Statewise Analytics and Dashboard'}},
  { path: 'symptomatic',  component: SymptomaticComponent ,data : { title: 'Covid-19 India Statewise Analytics and Dashboard'}},
  { path: 'intensive_care_cases',  component: IntensiveCareCasesComponent ,data : { title: 'Covid-19 India Statewise Analytics and Dashboard'}},
  { path: 'city_wise_cases',  component: CityWiseCardsComponent ,data : { title: 'Covid-19 India Statewise Analytics and Dashboard'}},
  { path: 'state_wise_cases',  component: StateWiseCardsComponent,data : { title: 'Covid-19 India Statewise Analytics and Dashboard'} }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnalyticsRoutingModule { }

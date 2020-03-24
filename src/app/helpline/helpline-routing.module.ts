import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { helplineComponent } from './components/helpline/helpline.component';
import { AwarenessComponent } from './components/awareness/awareness.component';
import { ContactInformationComponent } from './components/contact-information/contact-information.component';
import { TestingCenterComponent } from './components/testing-center/testing-center.component';
import { AdvisorComponent } from './components/advisor/advisor.component';
import { GuidelinesComponent } from './components/guidelines/guidelines.component';
import { AdditionalAdvisoryComponent } from './components/additional-advisory/additional-advisory.component';
import { NotifyingPersonsComponent } from './components/notifying-persons/notifying-persons.component';
import { PreventiveMeasuresComponent } from './components/preventive-measures/preventive-measures.component';
import { ProcedureForPassengerComponent } from './components/procedure-for-passenger/procedure-for-passenger.component';
import { StrategyCovid19Component } from './components/strategy-covid19/strategy-covid19.component';
import { EmergencyComponent } from './components/emergency/emergency.component';
import { RevisedStrategyComponent } from './components/revised-strategy/revised-strategy.component';
import { OrderComponent } from './components/order/order.component';
import { InfectionComponent } from './components/infection/infection.component';
import { DefeatComponent } from './components/defeat/defeat.component';

const routes: Routes = [
  { path: 'awareness',  component: AwarenessComponent },
  { path: 'contact-information',  component: ContactInformationComponent },
  { path: 'testing-center',  component: TestingCenterComponent },
  { path: 'awareness/advisor',  component: AdvisorComponent },
  { path: 'awareness/guidelines',  component: GuidelinesComponent },
  { path: 'awareness/additional-advisory',  component: AdditionalAdvisoryComponent },
  { path: 'awareness/notifying-persons',  component: NotifyingPersonsComponent },
  { path: 'awareness/preventive-measures',  component: PreventiveMeasuresComponent },
  { path: 'awareness/procedure-for-passenger',  component: ProcedureForPassengerComponent },
  { path: 'awareness/strategy-covid19',  component: StrategyCovid19Component },
  { path: 'awareness/emergency',  component: EmergencyComponent },
  { path: 'awareness/revised-strategy',  component: RevisedStrategyComponent },
  { path: 'awareness/order',  component: OrderComponent },
  { path: 'awareness/infection',  component: InfectionComponent },
  { path: 'awareness/defeat',  component: DefeatComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HelplineRoutingModule { }

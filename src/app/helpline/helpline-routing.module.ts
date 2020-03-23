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

const routes: Routes = [
  { path: 'awareness',  component: AwarenessComponent },
  { path: 'contact-information',  component: ContactInformationComponent },
  { path: 'testing-center',  component: TestingCenterComponent },
  { path: 'advisor',  component: AdvisorComponent },
  { path: 'guidelines',  component: GuidelinesComponent },
  { path: 'additional-advisory',  component: AdditionalAdvisoryComponent },
  { path: 'notifying-persons',  component: NotifyingPersonsComponent },
  { path: 'preventive-measures',  component: PreventiveMeasuresComponent },
  { path: 'procedure-for-passenger',  component: ProcedureForPassengerComponent },
  { path: 'strategy-covid19',  component: StrategyCovid19Component },
  { path: 'emergency',  component: EmergencyComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HelplineRoutingModule { }

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
import { SecretaryComponent } from './components/secretary/secretary.component';
import { OfficeOrderComponent } from './components/office-order/office-order.component';
import { OfficeMemorandumComponent } from './components/office-memorandum/office-memorandum.component';
import { OutbreakComponent } from './components/outbreak/outbreak.component';
import { GuidelineMeasuresComponent } from './components/guideline-measures/guideline-measures.component';
import { RoleComponent } from './components/role/role.component';
import { TelemedicineComponent } from './components/telemedicine/telemedicine.component';
import { GazetteComponent } from './components/gazette/gazette.component';
import { PressInformationComponent } from './components/press-information/press-information.component';
import { TestingComponent } from './components/testing/testing.component';
import { HealthAdvisoryComponent } from './components/health-advisory/health-advisory.component';
import { DisinfectionComponent } from './components/disinfection/disinfection.component';
import { OwnersComponent } from './components/owners/owners.component';
import { MindComponent } from './components/mind/mind.component';
import { VentilatorComponent } from './components/ventilator/ventilator.component';
import { IssuesComponent } from './components/issues/issues.component';
import { OpdMedicinesComponent } from './components/opd-medicines/opd-medicines.component';
import { ManagementComponent } from './components/management/management.component';
import { DialysisComponent } from './components/dialysis/dialysis.component';

const routes: Routes = [
  { path: 'awareness',  component: AwarenessComponent,data : { title: 'Covid-19 aka Coronavirus India - Awareness about Covid-19 and Blogs with latest government Guidelines, Procedures, Protocols,Advisories'}},
  { path: 'contact-information',  component: ContactInformationComponent,data : { title: 'Covid-19 aka Coronavirus India - Central Helpline Number for corona-virus: - +91-11-23978046. Helpline Numbers of States & Union Territories (UTs)'} },
  { path: 'testing-center',  component: TestingCenterComponent ,data : { title: 'Covid-19 aka Coronavirus India - Test Centres across India and Indian States, Cities'}},
  { path: 'awareness/advisor',  component: AdvisorComponent,data : { title: 'Covid-19 aka Coronavirus India - '} },
  { path: 'awareness/guidelines',  component: GuidelinesComponent,data : { title: 'Covid-19 aka Coronavirus India - '} },
  { path: 'awareness/additional-advisory',  component: AdditionalAdvisoryComponent,data : { title: 'Covid-19 aka Coronavirus India - '} },
  { path: 'awareness/notifying-persons',  component: NotifyingPersonsComponent ,data : { title: 'Covid-19 aka Coronavirus India - '}},
  { path: 'awareness/preventive-measures',  component: PreventiveMeasuresComponent ,data : { title: 'Covid-19 aka Coronavirus India - '}},
  { path: 'awareness/procedure-for-passenger',  component: ProcedureForPassengerComponent,data : { title: 'Covid-19 aka Coronavirus India - '} },
  { path: 'awareness/strategy-covid19',  component: StrategyCovid19Component ,data : { title: 'Covid-19 aka Coronavirus India - '}},
  { path: 'awareness/emergency',  component: EmergencyComponent ,data : { title: 'Covid-19 aka Coronavirus India - '}},
  { path: 'awareness/revised-strategy',  component: RevisedStrategyComponent ,data : { title: 'Covid-19 aka Coronavirus India - '}},
  { path: 'awareness/order',  component: OrderComponent,data : { title: 'Covid-19 aka Coronavirus India - '} },
  { path: 'awareness/infection',  component: InfectionComponent,data : { title: 'Covid-19 aka Coronavirus India - '} },
  { path: 'awareness/defeat',  component: DefeatComponent,data : { title: 'Covid-19 aka Coronavirus India - '} },
  { path: 'awareness/secretary',  component: SecretaryComponent,data : { title: 'Covid-19 aka Coronavirus India - '} },
  { path: 'awareness/office-order',  component: OfficeOrderComponent,data : { title: 'Covid-19 aka Coronavirus India - '} },
  { path: 'awareness/office-memorandum',  component: OfficeMemorandumComponent,data : { title: 'Covid-19 aka Coronavirus India - '} },
  { path: 'awareness/outbreak',  component: OutbreakComponent,data : { title: 'Covid-19 aka Coronavirus India - '} },
  { path: 'awareness/guideline-measures',  component: GuidelineMeasuresComponent,data : { title: 'Covid-19 aka Coronavirus India - '} },
  { path: 'awareness/role',  component: RoleComponent,data : { title: 'Covid-19 aka Coronavirus India - '} },
  { path: 'awareness/telemedicine',  component: TelemedicineComponent,data : { title: 'Covid-19 aka Coronavirus India - '} },
  { path: 'awareness/gazette',  component: GazetteComponent,data : { title: 'Covid-19 aka Coronavirus India - '} },
  { path: 'awareness/press-information',  component: PressInformationComponent,data : { title: 'Covid-19 aka Coronavirus India - '} },
  { path: 'awareness/testing',  component: TestingComponent,data : { title: 'Covid-19 aka Coronavirus India - '} },
  { path: 'awareness/health-advisory',  component: HealthAdvisoryComponent,data : { title: 'Covid-19 aka Coronavirus India - '} },
  { path: 'awareness/disinfection',  component: DisinfectionComponent,data : { title: 'Covid-19 aka Coronavirus India - '} },
  { path: 'awareness/owners',  component: OwnersComponent,data : { title: 'Covid-19 aka Coronavirus India - '} },
  { path: 'awareness/mind',  component: MindComponent,data : { title: 'Covid-19 aka Coronavirus India - '} },
  { path: 'awareness/ventilator',  component: VentilatorComponent,data : { title: 'Covid-19 aka Coronavirus India - '} },
  { path: 'awareness/issues',  component: IssuesComponent,data : { title: 'Covid-19 aka Coronavirus India - '} },
  { path: 'awareness/opd-medicines',  component: OpdMedicinesComponent,data : { title: 'Covid-19 aka Coronavirus India - '} },
  { path: 'awareness/management',  component: ManagementComponent,data : { title: 'Covid-19 aka Coronavirus India - '} },
  { path: 'awareness/dialysis',  component: DialysisComponent,data : { title: 'Covid-19 aka Coronavirus India - Guidelines for Dialysis with reference to COVID-19 Infection'} }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HelplineRoutingModule { }

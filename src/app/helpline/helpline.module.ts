import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HelplineRoutingModule } from './helpline-routing.module';
import { helplineComponent } from './components/helpline/helpline.component';
import { ContactInformationComponent } from './components/contact-information/contact-information.component';
import { AwarenessComponent } from './components/awareness/awareness.component';
import { TestingCenterComponent } from './components/testing-center/testing-center.component';
import { AdvisorComponent } from './components/advisor/advisor.component';
import { GuidelinesComponent } from './components/guidelines/guidelines.component';
import { AdditionalAdvisoryComponent } from './components/additional-advisory/additional-advisory.component';
import { PreventiveMeasuresComponent } from './components/preventive-measures/preventive-measures.component';
import { StrategyCovid19Component } from './components/strategy-covid19/strategy-covid19.component';
import { NotifyingPersonsComponent } from './components/notifying-persons/notifying-persons.component';
import { ProcedureForPassengerComponent } from './components/procedure-for-passenger/procedure-for-passenger.component';
import { EmergencyComponent } from './components/emergency/emergency.component';
import { RevisedStrategyComponent } from './components/revised-strategy/revised-strategy.component';
import { OrderComponent } from './components/order/order.component';
import { InfectionComponent } from './components/infection/infection.component';
import { DefeatComponent } from './components/defeat/defeat.component';


@NgModule({
  declarations: [helplineComponent, ContactInformationComponent, AwarenessComponent, TestingCenterComponent, AdvisorComponent, GuidelinesComponent, AdditionalAdvisoryComponent, PreventiveMeasuresComponent, StrategyCovid19Component, NotifyingPersonsComponent, ProcedureForPassengerComponent, EmergencyComponent, RevisedStrategyComponent, OrderComponent, InfectionComponent, DefeatComponent],
  imports: [
    CommonModule,
    HelplineRoutingModule
  ]
})
export class HelplineModule { }

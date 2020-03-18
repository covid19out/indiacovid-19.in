import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { helplineComponent } from './components/helpline/helpline.component';
import { AwarenessComponent } from './components/awareness/awareness.component';
import { ContactInformationComponent } from './components/contact-information/contact-information.component';
import { TestingCenterComponent } from './components/testing-center/testing-center.component';
import { AdvisorComponent } from './components/advisor/advisor.component';
import { GuidelinesComponent } from './components/guidelines/guidelines.component';
import { AdditionalAdvisoryComponent } from './components/additional-advisory/additional-advisory.component';

const routes: Routes = [
  { path: 'awareness',  component: AwarenessComponent },
  { path: 'contact-information',  component: ContactInformationComponent },
  { path: 'testing-center',  component: TestingCenterComponent },
  { path: 'advisor',  component: AdvisorComponent },
  { path: 'guidelines',  component: GuidelinesComponent },
  { path: 'additional-advisory',  component: AdditionalAdvisoryComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HelplineRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HelplineRoutingModule } from './helpline-routing.module';
import { helplineComponent } from './components/helpline/helpline.component';
import { ContactInformationComponent } from './components/contact-information/contact-information.component';
import { AwarenessComponent } from './components/awareness/awareness.component';
import { TestingCenterComponent } from './components/testing-center/testing-center.component';


@NgModule({
  declarations: [helplineComponent, ContactInformationComponent, AwarenessComponent, TestingCenterComponent],
  imports: [
    CommonModule,
    HelplineRoutingModule
  ]
})
export class HelplineModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SourcesRoutingModule } from './sources-routing.module';
import { SourcesComponent } from './components/sources/sources.component';


@NgModule({
  declarations: [SourcesComponent],
  imports: [
    CommonModule,
    SourcesRoutingModule
  ]
})
export class SourcesModule { }

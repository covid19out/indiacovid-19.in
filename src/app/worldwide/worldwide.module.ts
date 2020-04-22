import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorldwideRoutingModule } from './worldwide-routing.module';
import { WorldwideComponent } from './components/worldwide/worldwide.component';


@NgModule({
  declarations: [WorldwideComponent],
  imports: [
    CommonModule,
    WorldwideRoutingModule
  ]
})
export class WorldwideModule { }

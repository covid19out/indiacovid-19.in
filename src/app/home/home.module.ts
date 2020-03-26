import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { CountryMapComponent } from './country-map/country-map.component';

@NgModule({
  declarations: [HomeComponent, CountryMapComponent],
  imports: [
    CommonModule,
    FormsModule,
    HomeRoutingModule,
    ChartsModule,
    BsDatepickerModule.forRoot(),
  ]
})
export class HomeModule { }

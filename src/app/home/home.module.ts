import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home/home.component';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { CountryMapComponent } from './components/country-map/country-map.component';
import { TopStateTableComponent } from './components/top-state-table/top-state-table.component';

@NgModule({
  declarations: [HomeComponent, CountryMapComponent, TopStateTableComponent],
  imports: [
    CommonModule,
    FormsModule,
    HomeRoutingModule,
    ChartsModule,
    BsDatepickerModule.forRoot(),
  ]
})
export class HomeModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home/home.component';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { CountryMapComponent } from './components/country-map/country-map.component';
import { TopStateTableComponent } from './components/top-state-table/top-state-table.component';
import { TestConductedCumulativeChartComponent } from './components/test-conducted-cumulative-chart/test-conducted-cumulative-chart.component';
import { ConfirmCumulativeChartComponent } from './components/confirm-cumulative-chart/confirm-cumulative-chart.component';
import { NumberOfCasesComponent } from './components/number-of-cases/number-of-cases.component';
import { HeaerBarChartComponent } from './components/heaer-bar-chart/heaer-bar-chart.component';

@NgModule({
  declarations: [HomeComponent, CountryMapComponent, TopStateTableComponent, TestConductedCumulativeChartComponent, ConfirmCumulativeChartComponent, NumberOfCasesComponent, HeaerBarChartComponent],
  imports: [
    CommonModule,
    FormsModule,
    HomeRoutingModule,
    ChartsModule,
    BsDatepickerModule.forRoot(),
  ]
})
export class HomeModule { }

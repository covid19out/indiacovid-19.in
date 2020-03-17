import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';
import { NgApexchartsModule } from "ng-apexcharts";

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { BsDatepickerModule } from 'ngx-bootstrap';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ChartsModule,
    NgApexchartsModule,
    BsDatepickerModule.forRoot(),
  ]
})
export class HomeModule { }

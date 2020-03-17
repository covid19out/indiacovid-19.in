import { Component, OnInit } from '@angular/core';

import { MultiDataSet, Label, Color } from 'ng2-charts';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as _ from 'lodash';

@Component({
  selector: 'app-symptomatic',
  templateUrl: './symptomatic.component.html',
  styleUrls: ['./symptomatic.component.scss']
})
export class SymptomaticComponent implements OnInit {
  public minDate=new Date('jan 2020');
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public dates=['10 Mar', '11 Mar', '12 Mar', '13 Mar', '14 Mar', '15 Mar', '16 Mar'];
  public dataByDates=[0, 0, 0, 0, 1, 2, 2];
  public barChartLabels: Label[] = this.dates;
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];
  public barChartData: ChartDataSets[] = [
    { data: this.dataByDates, label: 'DISCHARGED / RECOVERED CASES', stack: 'a' }
  ];
  public startDate: any;
  public endDate: any;
  
  constructor() { }

  ngOnInit() {
  }
  
  dateFilterChanged(event){
    let data=[];
    var self=this;
    this.startDate=event[0].toLocaleDateString("en-US" , Option);
    this.endDate=event[1].toLocaleDateString("en-US", Option);
    event[0].setHours(0,0,0,0);
    this.barChartLabels=_.filter(this.dates,function(d,i){
      let date=new Date(d +  "2020");
      if(date >= event[0]  && date <= event[1]){
        data.push(self.dataByDates[i]);
        return d;
      }
    });
    this.barChartData= [{ data:data , label: 'DISCHARGED / RECOVERED CASES', stack: 'a' }];
  }
}

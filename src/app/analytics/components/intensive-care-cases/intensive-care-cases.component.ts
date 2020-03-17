import { Component, OnInit } from '@angular/core';

import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { MultiDataSet, Label, Color } from 'ng2-charts';
import * as _ from 'lodash';

@Component({
  selector: 'app-intensive-care-cases',
  templateUrl: './intensive-care-cases.component.html',
  styleUrls: ['./intensive-care-cases.component.scss']
})
export class IntensiveCareCasesComponent implements OnInit {
  public minDate=new Date('jan 2020');
  public lineChartLegend = false;
  public lineChartType = 'line';
  public lineChartPlugins = [];
  //Gender over Time line chart
  public months=['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public dataByMonths=[10, 12, 10, 8, 15, 18, 14, 17, 21, 23];
  public lineChartData: ChartDataSets[] = [
    { data: this.dataByMonths, label: 'Male' }
  ];
  public lineChartLabels: Label[] = this.months;
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    annotation: false
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'blue',
      backgroundColor: 'rgba(0,0,0,0)',
    },
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
    this.lineChartLabels=_.filter(this.months,function(month,i){
      let date=new Date(month +  "2020");
      if((event[0].getMonth()==date.getMonth()) || (event[1].getMonth()==date.getMonth()) || (date>= event[0] && date<=event[1])){
        data.push(self.dataByMonths[i]);
        return month;
      }
    });
    this.lineChartData= [{ data:data , label: 'DISCHARGED / RECOVERED CASES', stack: 'a' }];
  }

}

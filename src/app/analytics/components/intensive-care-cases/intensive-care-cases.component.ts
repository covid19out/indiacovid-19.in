import { Component, OnInit } from '@angular/core';

import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { MultiDataSet, Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-intensive-care-cases',
  templateUrl: './intensive-care-cases.component.html',
  styleUrls: ['./intensive-care-cases.component.scss']
})
export class IntensiveCareCasesComponent implements OnInit {
  public lineChartLegend = false;
  public lineChartType = 'line';
  public lineChartPlugins = [];
  //Gender over Time line chart
  public lineChartData: ChartDataSets[] = [
    { data: [10, 12, 10, 8, 15, 18, 14, 17, 21, 23], label: 'Male' }
  ];
  public lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
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

  constructor() { }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import { MultiDataSet, Label, Color } from 'ng2-charts';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';

@Component({
  selector: 'app-recovered',
  templateUrl: './recovered.component.html',
  styleUrls: ['./recovered.component.scss']
})
export class RecoveredComponent implements OnInit {

  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = ['10 Mar', '11 Mar', '12 Mar', '13 Mar', '14 Mar', '15 Mar', '16 Mar'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];
  public barChartData: ChartDataSets[] = [
    { data: [0, 0, 0, 0, 1, 2, 2], label: 'DISCHARGED / RECOVERED CASES', stack: 'a' }
  ];

  constructor() { }

  ngOnInit() {
  }

}

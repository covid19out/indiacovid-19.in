import { Component, OnInit, Input } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import * as _ from 'lodash';
import { PatientsDataService } from 'src/app/services/patients-data.service';

@Component({
  selector: 'app-header-bar-chart',
  templateUrl: './header-bar-chart.component.html',
  styleUrls: ['./header-bar-chart.component.scss']
})
export class HeaderBarChartComponent implements OnInit {
  @Input() patientsData:any;
  public headerBarChartOptions: ChartOptions;
  public headerBarChartSourceLabels: Label[] = [];
  public headerBarChartType: ChartType = 'bar';
  public headerBarChartData: ChartDataSets[] = [
    { data: [], label: 'Confirmed' }
  ];
  public headerBarChartSourceColors: Color[];

  constructor(private patientsDataService: PatientsDataService) { }

  ngOnInit() {
    this.initChart();   
    //console.log('header patientsData',this.patientsData);
    this.assignHeaderBarChartData();   
  }

  initChart() {
    this.headerBarChartOptions = {
      tooltips: { enabled: true },
      responsive: true,
      // annotation: false,
      scales: {
        xAxes: [{
          display: false
        }],
        yAxes: [{
          display: false
        }]
      }
    };

    this.headerBarChartSourceColors = [
      {
        borderColor: '#9399ff',
        backgroundColor: 'rgba(255,255,255,0.4)',
      }
    ];
  }

  assignHeaderBarChartData() {
    this.headerBarChartSourceLabels = [];
    this.headerBarChartData[0].data = [];

    if (this.patientsData.cases_time_series) {
      this.patientsData.cases_time_series.forEach(cases => {
        this.headerBarChartSourceLabels.push(cases.date);
        this.headerBarChartData[0].data.push(cases.dailyconfirmed);
      });
    }
  }
}

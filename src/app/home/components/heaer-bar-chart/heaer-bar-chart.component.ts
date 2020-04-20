import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import * as _ from 'lodash';
import { PatientsDataService } from 'src/app/services/patients-data.service';

@Component({
  selector: 'app-heaer-bar-chart',
  templateUrl: './heaer-bar-chart.component.html',
  styleUrls: ['./heaer-bar-chart.component.scss']
})
export class HeaerBarChartComponent implements OnInit {

  public headerBarChartOptions: ChartOptions;
  public headerBarChartSourceLabels: Label[] = [];
  public headerBarChartType: ChartType = 'bar';
  public headerBarChartData: ChartDataSets[] = [
    { data: [], label: 'Confirmed' }
  ];
  public headerBarChartSourceColors: Color[];

  patientsData: any;

  constructor(private patientsDataService: PatientsDataService) { }

  ngOnInit() {
    this.initChart();
    if (this.patientsDataService.patientsData) {
      this.patientsData = this.patientsDataService.patientsData;
      this.assignHeaderBarChartData();
    }
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

    if (this.patientsData.length) {
      var dateWiseConfirm = _.groupBy(this.patientsData, 'confirmAt');

      for (let confirmAt in dateWiseConfirm) {
        this.headerBarChartSourceLabels.push(confirmAt);

        this.headerBarChartData[0].data.push(dateWiseConfirm[confirmAt].length);
      };

    }
  }

}

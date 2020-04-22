import { Component, OnInit, Input } from '@angular/core';
import { Color, Label } from 'ng2-charts';
import { ChartOptions, ChartDataSets } from 'chart.js';

@Component({
  selector: 'app-number-of-cases',
  templateUrl: './number-of-cases.component.html',
  styleUrls: ['./number-of-cases.component.scss']
})
export class NumberOfCasesComponent implements OnInit {
  @Input() patientsData: any;

  casesLineChartLabels: Label[] = [];
  casesLineChartData: ChartDataSets[] = [];
  casesLineChartOptions: (ChartOptions & { annotation: any });
  casesLineChartColors: Color[];

  constructor() { }

  ngOnInit() {
    this.initChart();
    this.assignNumberOfCasesLineChartData();
  }

  initChart() {
    this.casesLineChartData = [
      { data: [], label: 'CONFIRMED', lineTension: 0, pointBackgroundColor: 'rgba(0, 0, 0, 0)', pointBorderColor: 'rgba(0, 0, 0, 0)' },
      { data: [], label: 'DISCHARGED', lineTension: 0, pointBackgroundColor: 'rgba(0, 0, 0, 0)', pointBorderColor: 'rgba(0, 0, 0, 0)' },
      { data: [], label: 'DECEASED', lineTension: 0, pointBackgroundColor: 'rgba(0, 0, 0, 0)', pointBorderColor: 'rgba(0, 0, 0, 0)' },
    ];
    this.casesLineChartOptions = {
      responsive: true,
      annotation: true,
      legend: {
        display: true,
        labels: {
          boxWidth: 11,
          fontSize: 10,
        }
      },
      layout: {
        padding: {
          top: 5,
          bottom: 5,
          right: 5,
          left: 5,
        }
      },
      scales: {
        xAxes: [{
          display: false,
          gridLines: {
            color: "rgba(0, 0, 0, 0)",
          }
        }],
        yAxes: [{
          display: false,
          gridLines: {
            color: "rgba(0, 0, 0, 0)",
          }
        }]
      }
    };
    this.casesLineChartColors = [
      {
        borderColor: '#FD1717 ',
        backgroundColor: 'rgba(0,0,0,0)',
        pointBackgroundColor: '#FD1717',
        pointBorderColor: '#fff',
      },
      {
        borderColor: '#17CE41',
        backgroundColor: 'rgba(0,0,0,0)',
        pointBackgroundColor: '#17CE41',
        pointBorderColor: '#fff',
      },
      {
        borderColor: '#C1C1C1',
        backgroundColor: 'rgba(0,0,0,0)',
        pointBackgroundColor: '#C1C1C1',
        pointBorderColor: '#fff',
      }];
  }

  assignNumberOfCasesLineChartData() {
    if (this.patientsData.cases_time_series) {
      this.casesLineChartLabels = [];
      this.casesLineChartData[0].data = [];
      this.casesLineChartData[1].data = [];
      this.casesLineChartData[2].data = [];

      this.patientsData.cases_time_series.forEach(dateWiseData => {
        this.casesLineChartLabels.push(dateWiseData.date);
        this.casesLineChartData[0].data.push(dateWiseData.dailyconfirmed);
        this.casesLineChartData[1].data.push(dateWiseData.dailyrecovered);
        this.casesLineChartData[2].data.push(dateWiseData.dailydeceased);
      });
    }
  }

}

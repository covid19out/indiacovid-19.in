import { Component, OnInit } from '@angular/core';
import { Color, Label } from 'ng2-charts';
import { ChartOptions, ChartDataSets } from 'chart.js';
import * as _ from 'lodash';
import * as moment from 'moment';

import { PatientsDataService } from 'src/app/services/patients-data.service';

@Component({
  selector: 'app-number-of-cases',
  templateUrl: './number-of-cases.component.html',
  styleUrls: ['./number-of-cases.component.scss']
})
export class NumberOfCasesComponent implements OnInit {
  casesLineChartLabels: Label[] = [];
  casesLineChartData: ChartDataSets[] = [];
  casesLineChartOptions: (ChartOptions & { annotation: any });
  casesLineChartColors: Color[];

  patientsData: any;
  recoveredPatientData: any;
  deceasedPatientData: any;

  constructor(private patientsDataService: PatientsDataService) { }

  ngOnInit() {
    this.initChart();
    this.patientsDataService.patientsData.subscribe(data => {
      if (data) {
        this.patientsData = data;
        this.assignNumberOfCasesLineChartData();
      }
    });

    this.patientsDataService.recoveredPatientsData.subscribe(data => {
      if (data) {
        this.recoveredPatientData = data;
        this.assignNumberOfCasesLineChartData();
      }
    });

    this.patientsDataService.deceasedPatientsData.subscribe(data => {
      if (data) {
        this.deceasedPatientData = data;
        this.assignNumberOfCasesLineChartData();
      }
    });
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
      scales: {
        xAxes: [{
          gridLines: {
            color: "rgba(0, 0, 0, 0)",
          }
        }],
        yAxes: [{
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
    if (this.patientsData && this.deceasedPatientData && this.recoveredPatientData) {
      this.casesLineChartLabels = [];
      this.casesLineChartData[0].data = [];
      this.casesLineChartData[1].data = [];
      this.casesLineChartData[2].data = [];

      let dateWiseConfirmCases = _.groupBy(this.patientsData, 'confirmAt');
      let dateWiseRecoverdCases = _.groupBy(this.recoveredPatientData, 'date');
      let dateWiseDeceasedCases = _.groupBy(this.deceasedPatientData, 'date');

      for (let confirmDate in dateWiseConfirmCases) {
        let label = moment(confirmDate, "DD/MM/YYYY").format("DD MMM YYYY");
        let labelDate = moment(confirmDate, "DD-MM-YYYY").format("DD/MM/YYYY");
        this.casesLineChartLabels.push(label);
        let confirmCount = dateWiseConfirmCases[confirmDate].length;
        let recoveredCount = dateWiseRecoverdCases[labelDate] ? dateWiseRecoverdCases[labelDate].length : 0;
        let deceasedCount = dateWiseDeceasedCases[labelDate] ? dateWiseDeceasedCases[labelDate].length : 0;

        this.casesLineChartData[0].data.push(confirmCount);
        this.casesLineChartData[1].data.push(recoveredCount);
        this.casesLineChartData[2].data.push(deceasedCount);
      }
    }
  }

}

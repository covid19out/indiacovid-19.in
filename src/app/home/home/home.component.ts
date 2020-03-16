import { Component, OnInit } from '@angular/core';

import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { MultiDataSet, Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  //stacked chart
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];
  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'REPORTED SYMPTOMATIC', stack: 'a' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'CONFIRMED CASES', stack: 'a' },
    { data: [15, 20, 25, 12, 50, 17, 10], label: ' DISCHARGED', stack: 'a' }
  ];


  // Doughnut charts
  public doughnutChartType: ChartType = 'doughnut';

  //Doughnut Gender
  public doughnutChartLabels: Label[] = ['Male', 'Female'];
  public doughnutChartData: MultiDataSet = [
    [131, 95]
  ];
  public pieChartGenderOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'bottom'
    }
  };

//   public pieChartGenderPlugins = [{
//   afterLayout: function (chart) {
//     console.log(chart.legend.legendItems)
//     chart.legend.legendItems.forEach(
//       (label,i) => {
//         console.log("lable",chart.data.datasets[0]);
//         let value = chart.data.datasets[0].data[label.index];
//
//         label.text += ' ' + value;
//         return label;
//       }
//     )
//   }
// }];



  //Doughnut Nationality
  public doughnutNationalityChartLabels: Label[] = ['Singaporean', 'Chinese', 'Filipino', 'Indonesian', 'Bangladeshi', 'Malaysian', 'Others'];
  public doughnutNationalityChartData: MultiDataSet = [
    [167, 19, 9, 8, 5, 5, 11]
  ];
  public pieChartNationalityOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'bottom'
    }
  };

//   public pieChartNationalityPlugins = [{
//   afterLayout: function (chart) {
//     chart.legend.legendItems.forEach(
//       (label) => {
//         let value = chart.data.datasets[0].data[label.index];
//
//         label.text += ' ' + value;
//         return label;
//       }
//     )
//   }
// }];

  //Doughnut Source
  public doughnutSourceChartLabels: Label[] = ['Local Transmission', 'Imported Cases'];
  public doughnutSourceChartData: MultiDataSet = [
    [151, 75]
  ];

  public pieChartSourceOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'bottom'
    }
  };


  //Line charts
  public lineChartLegend = false;
  public lineChartType = 'line';
  public lineChartPlugins = [];
  //Gender over Time line chart
  public lineChartData: ChartDataSets[] = [
    { data: [10, 12, 10, 8, 15, 18, 14, 17, 21, 23], label: 'Male' },
    { data: [ 7,  8,  9, 6, 10, 14, 12, 14, 19, 20], label: 'Female' },
  ];
  public lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    annotation: false
  };
  public lineChartColors: Color[] = [
    {
      borderColor: '#86c7f3',
      backgroundColor: 'rgba(134,199,243,0.3)',
    },
    {
      borderColor: '#ffa1b5',
      backgroundColor: 'rgba(255,161,181,0.3)',
    }
  ];

  public pieChartGenderOverTimeOptions: ChartOptions = {
    scales: {
       xAxes: [{
           gridLines: {
               display:false
           }
       }],
       yAxes: [{
           gridLines: {
               display:false
           }
       }]
   }
};



//Infection Source over Time
  public lineChartInfectionSourceData: ChartDataSets[] = [
    { data: [10, 12, 10, 8, 15, 18, 14, 17, 21, 23], label: 'IMPORTED CASE' },
    { data: [ 0,  0,  0, 6, 10, 20, 17, 22, 35, 40], label: 'LOCAL TRANSMISSION' },
  ];
  public lineChartInfectionSourceLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartInfectionSourceOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    annotation: false
  };
  public lineChartInfectionSourceColors: Color[] = [
    {
      borderColor: '#86c7f3',
      backgroundColor: 'rgba(134,199,243,0.3)',
    },
    {
      borderColor: '#ffa1b5',
      backgroundColor: 'rgba(255,161,181,0.3)',
    },
  ];


  constructor() { }

  ngOnInit() {
  }

}

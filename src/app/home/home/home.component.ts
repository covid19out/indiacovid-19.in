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
  public barChartLabels: Label[] = ['01 Feb', '02 Mar','03 Mar', '04 Mar', '05 Mar','06 Mar', '07 Mar','08 Mar', '09 Mar','10 Mar','11 Mar', '12 Mar' ,'13 Mar','14 Mar','15 Mar', '16 Mar'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];
  public barChartData: ChartDataSets[] = [
    { data: [2, 3, 5, 6, 29, 30, 31,34,39,45,50,71,76,83,95,109,119], label: 'REPORTED SYMPTOMATIC', stack: 'a' },
    { data: [0, 1, 40, 17, 1, 1, 2,], label: 'CONFIRMED CASES', stack: 'a' },
    { data: [1, 1, 25, 6, 0, 0, 1,], label: ' DISCHARGED', stack: 'a' }
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
    [81, 38]
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

import { Component, OnInit, ViewChild } from '@angular/core';

import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { MultiDataSet, Label, Color } from 'ng2-charts';
import {
  ApexAxisChartSeries, ApexChart, ChartComponent, ApexTitleSubtitle, ApexDataLabels, ApexStroke,
  ApexGrid, ApexYAxis, ApexXAxis, ApexPlotOptions, ApexTooltip
} from "ng-apexcharts";

export type ApexChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  grid: ApexGrid;
  colors: string[];
  tooltip: ApexTooltip;
  title: ApexTitleSubtitle;
};
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
  public barChartLabels: Label[] = ['01 Feb', '02 Mar', '03 Mar', '04 Mar', '05 Mar', '06 Mar', '07 Mar', '08 Mar', '09 Mar', '10 Mar', '11 Mar', '12 Mar', '13 Mar', '14 Mar', '15 Mar', '16 Mar'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];
  public barChartData: ChartDataSets[] = [
    { data: [2, 3, 5, 6, 29, 30, 31, 34, 39, 45, 50, 71, 76, 83, 95, 109, 119], label: 'REPORTED SYMPTOMATIC', stack: 'a' },
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
  public pieChartGenderColors = [
    {
      backgroundColor: [
        '#86c7f3',
        '#ffa1b5'
      ]
    }
  ];

  // public pieChartGenderPlugins = [{
  //   afterLayout: function (chart) {
  //     chart.legend.legendItems.forEach(
  //       (label, i) => {
  //         let value = chart.data.datasets[0].data[label.index];
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
    { data: [10, 12, 10, 8, 15, 18, 14, 17, 21, 23], label: 'Male', lineTension: 0, pointBackgroundColor: 'rgba(0, 0, 0, 0)', pointBorderColor: 'rgba(0, 0, 0, 0)' },
    { data: [7, 8, 9, 6, 10, 14, 12, 14, 19, 20], label: 'Female', lineTension: 0, pointBackgroundColor: 'rgba(0, 0, 0, 0)', pointBorderColor: 'rgba(0, 0, 0, 0)' },
  ];
  public lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    annotation: false,
    scales: {
      xAxes: [
        {
          display: false
        }
      ],
      yAxes: [
        {
          display: false
        }
      ]
    }

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


  //Infection Source over Time
  public lineChartInfectionSourceData: ChartDataSets[] = [
    { data: [10, 12, 10, 8, 15, 18, 14, 17, 21, 23], label: 'IMPORTED CASE', lineTension: 0, pointBackgroundColor: 'rgba(0, 0, 0, 0)', pointBorderColor: 'rgba(0, 0, 0, 0)' },
    { data: [0, 0, 0, 6, 10, 20, 17, 22, 35, 40], label: 'LOCAL TRANSMISSION', lineTension: 0, pointBackgroundColor: 'rgba(0, 0, 0, 0)', pointBorderColor: 'rgba(0, 0, 0, 0)' },
  ];
  public lineChartInfectionSourceLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartInfectionSourceOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    annotation: false,
    scales: {
      xAxes: [
        {
          display: false
        }
      ],
      yAxes: [
        {
          display: false
        }
      ]
    }
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

  //Confirmed card Line chart
  public lineChartConfirmedData: ChartDataSets[] = [
    { data: [10, 12, 10, 8, 15, 18, 14, 17, 21, 23], label: 'CONFIRMED CASES', lineTension: 0, pointBackgroundColor: 'rgba(0, 0, 0, 0)', pointBorderColor: 'rgba(0, 0, 0, 0)' }
  ];
  public lineChartConfirmedSourceLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartConfirmedSourceOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    annotation: false,
    scales: {
      xAxes: [
        {
          display: false
        }
      ],
      yAxes: [
        {
          display: false
        }
      ]
    }
  };
  public lineChartConfirmedSourceColors: Color[] = [
    {
      borderColor: '#6e7f90',
      backgroundColor: 'rgba(110,127,144,0.2)',
    }
  ];

  //Hospitalized card line chart
  public lineChartSymptomaticData: ChartDataSets[] = [
    { data: [10, 12, 15, 17, 21, 23, 23, 25, 27, 27], label: 'CONFIRMED CASES', lineTension: 0, pointBackgroundColor: 'rgba(0, 0, 0, 0)', pointBorderColor: 'rgba(0, 0, 0, 0)' }
  ];
  public lineChartSymptomaticSourceLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartSymptomaticSourceOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    annotation: false,
    scales: {
      xAxes: [
        {
          display: false
        }
      ],
      yAxes: [
        {
          display: false
        }
      ]
    }
  };
  public lineChartSymptomaticSourceColors: Color[] = [
    {
      borderColor: '#6e7f90',
      backgroundColor: 'rgba(110,127,144,0.3)',
    }
  ];

  //Intensive card line chart
  public lineChartIntensiveData: ChartDataSets[] = [
    { data: [15, 20, 30, 8, 21, 10, 5, 17, 21, 23], label: 'CONFIRMED CASES', lineTension: 0, pointBackgroundColor: 'rgba(0, 0, 0, 0)', pointBorderColor: 'rgba(0, 0, 0, 0)' }
  ];
  public lineChartIntensiveSourceLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartIntensiveSourceOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    annotation: false,
    scales: {
      xAxes: [
        {
          display: false
        }
      ],
      yAxes: [
        {
          display: false
        }
      ]
    }
  };
  public lineChartIntensiveSourceColors: Color[] = [
    {
      borderColor: '#6e7f90',
      backgroundColor: 'rgba(110,127,144,0.3)',
    }
  ];

  //Discharge card line chart
  public lineChartDischargeData: ChartDataSets[] = [
    { data: [0, 0, 2, 1, 0, 1, 3, 0, 1, 2], label: 'CONFIRMED CASES', lineTension: 0, pointBackgroundColor: 'rgba(0, 0, 0, 0)', pointBorderColor: 'rgba(0, 0, 0, 0)' }
  ];
  public lineChartDischargeSourceLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartDischargeSourceOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    annotation: false,
    scales: {
      xAxes: [
        {
          display: false
        }
      ],
      yAxes: [
        {
          display: false
        }
      ]
    }
  };
  public lineChartDischargeSourceColors: Color[] = [
    {
      borderColor: '#6e7f90',
      backgroundColor: 'rgba(110,127,144,0.3)',
    }
  ];

  //Apex chart
  @ViewChild("chart", { static: true }) chart: ChartComponent;
  public apexChartOptions: Partial<ApexChartOptions>;


  constructor() { }

  ngOnInit() {
    this.apexChartOptions = {
      series: [
        {
          name: "Females",
          data: [-0.8, -1.05, -1.06, -1.18, -1.4, -2.2, -2.85, -3.7, -3.96]
        },
        {
          name: "Males",
          data: [0.4, 0.65, 0.76, 0.88, 1.5, 2.1, 2.9, 3.8, 3.9]
        }
      ],
      chart: {
        type: "bar",
        height: 440,
        stacked: true
      },
      colors: ["#ffa1b5", "#86c7f3"],
      plotOptions: {
        bar: {
          horizontal: true,
          barHeight: "80%"
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: 1,
        colors: ["#fff"]
      },

      grid: {
        xaxis: {
          lines: {
            show: false
          }
        }
      },
      yaxis: {
        min: -5,
        max: 5,
        title: {
          // text: 'Age',
        }
      },
      tooltip: {
        shared: false,
        x: {
          formatter: function (val) {
            return val.toString();
          }
        },
        y: {
          formatter: function (val) {
            return Math.abs(val) + "%";
          }
        }
      },
      xaxis: {
        categories: ["85+", "80-84", "75-79", "70-74", "65-69", "60-64", "55-59", "50-54", "45-49", "40-44", "35-39", "30-34", "25-29",
          "20-24", "15-19", "10-14", "5-9", "0-4"
        ],
        title: {
          text: "Percent"
        },
        labels: {
          formatter: function (val) {
            return Math.abs(Math.round(parseInt(val, 10))) + "%";
          }
        }
      }
    };
  }

}

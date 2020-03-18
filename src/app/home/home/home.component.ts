import { Component, OnInit, ViewChild } from '@angular/core';

import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { MultiDataSet, Label, Color } from 'ng2-charts';
import {
  ApexAxisChartSeries, ApexChart, ChartComponent, ApexTitleSubtitle, ApexDataLabels, ApexStroke,
  ApexGrid, ApexYAxis, ApexXAxis, ApexPlotOptions, ApexTooltip
} from "ng-apexcharts";
import * as _ from 'lodash';
import { PatientsDataService } from 'src/app/services/patients-data.service';

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
  public minDate = new Date('jan 2020');
  public totalCases = 0;
  public totalConfirmedCases = 0;
  public totalHospitalisedCases = 0; 
  public totalIntesiveCases = 0; 
  public totalDischargedCases = 0;
  //stacked chart
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];
  public barChartData: ChartDataSets[] = [
    { data: [], label: 'REPORTED SYMPTOMATIC', stack: 'a' },
    { data: [], label: 'CONFIRMED CASES', stack: 'a' },
    { data: [], label: ' DISCHARGED', stack: 'a' }
  ];


  // Doughnut charts
  public doughnutChartType: ChartType = 'doughnut';

  //Doughnut Gender
  public doughnutChartLabels: Label[] = ['Male', 'Female'];
  public doughnutChartData: MultiDataSet = [[]];
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
    []
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
  public months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  public lineChartLabels: Label[] = this.months;
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
    { data: [], label: 'CONFIRMED CASES', lineTension: 0, pointBackgroundColor: 'rgba(0, 0, 0, 0)', pointBorderColor: 'rgba(0, 0, 0, 0)' }
  ];
  public lineChartConfirmedSourceLabels: Label[] = [];
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
    { data: [], label: 'Hospitalised CASES', lineTension: 0, pointBackgroundColor: 'rgba(0, 0, 0, 0)', pointBorderColor: 'rgba(0, 0, 0, 0)' }
  ];
  public lineChartSymptomaticSourceLabels: Label[] = [];
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
    { data: [], label: 'INTENSIVE CASES', lineTension: 0, pointBackgroundColor: 'rgba(0, 0, 0, 0)', pointBorderColor: 'rgba(0, 0, 0, 0)' }
  ];
  public lineChartIntensiveSourceLabels: Label[] = [];
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
    { data: [], label: 'DISCHARGED CASES', lineTension: 0, pointBackgroundColor: 'rgba(0, 0, 0, 0)', pointBorderColor: 'rgba(0, 0, 0, 0)' }
  ];
  public lineChartDischargeSourceLabels: Label[] = [];
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
  public startDate: any = new Date("21 January 2020");
  public endDate: any = new Date();
  public patientsData: any;

  constructor(private patientsDataService: PatientsDataService) { }

  ngOnInit() {
    this.patientsDataService.patientsData.subscribe(data => {
      this.patientsData = data;
      this.dateFilterChanged([this.startDate, this.endDate]);
    })
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

  prepareBarChartData(patientRecords: any) {
    var dateWiseData = this.patientsDataService.filterDataByDates(patientRecords);
    this.assignDatatoBarChart(dateWiseData);
    this.assigndoughnutChartData(patientRecords);
    this.assigndoughnutSourceChartData(patientRecords);
    this.assignLineChartData(patientRecords);
    this.assignConfimedLineChartData(dateWiseData);
    this.assignHospitalisedLineChartData(dateWiseData);
  }

  assignLineChartData(dateWiseData: any[]) {
    let chartLabels = [];
    let chartDataOfMales = [];
    let chartDataOfFemales = [];
    let chartDataOfImported = [];
    let chartDataOfLocal = [];
    if (dateWiseData.length == 1) {
      dateWiseData = _.concat({ "confirmedAt": new Date(new Date().setDate(new Date(dateWiseData[0].confirmedAt).getDate() - 1)) }, dateWiseData);
    }
    _.forEach(_.groupBy(dateWiseData, 'confirmedAt'), function (value, key) {
      chartLabels.push(key);
      let genderWiseData = _.groupBy(value, 'gender');
      chartDataOfMales.push(genderWiseData.Male ? genderWiseData.Male.length : 0);
      chartDataOfFemales.push(genderWiseData.Female ? genderWiseData.Female.length : 0);
      let transmissionSourceWiseData = _.groupBy(value, 'source');
      chartDataOfImported.push(transmissionSourceWiseData.Imported ? transmissionSourceWiseData.Imported.length : 0);
      chartDataOfLocal.push(transmissionSourceWiseData.Local ? transmissionSourceWiseData.Local.length : 0);
    });
    this.lineChartLabels = this.lineChartInfectionSourceLabels = chartLabels;
    this.lineChartData = [
      { data: chartDataOfMales, label: 'Male', lineTension: 0, pointBackgroundColor: 'rgba(0, 0, 0, 0)', pointBorderColor: 'rgba(0, 0, 0, 0)' },
      { data: chartDataOfFemales, label: 'Female', lineTension: 0, pointBackgroundColor: 'rgba(0, 0, 0, 0)', pointBorderColor: 'rgba(0, 0, 0, 0)' },
    ];
    this.lineChartInfectionSourceData = [
      { data: chartDataOfImported, label: 'IMPORTED CASE', lineTension: 0, pointBackgroundColor: 'rgba(0, 0, 0, 0)', pointBorderColor: 'rgba(0, 0, 0, 0)' },
      { data: chartDataOfLocal, label: 'LOCAL TRANSMISSION', lineTension: 0, pointBackgroundColor: 'rgba(0, 0, 0, 0)', pointBorderColor: 'rgba(0, 0, 0, 0)' },
    ];
  }

  getDataCount(data: any): any {
    let count: number = 0;
    _.forEach(data, function (p) {
      count++;
    });
    return count;
  }

  assigndoughnutNationalityChartData(patientRecords: any[]) {
    let NationalityChartLabels = [];
    let NationalityChartData = [];
    var data = _.groupBy(patientRecords, 'nationality');
    _.forEach(data, function (value, key) {
      NationalityChartLabels.push(key);
      NationalityChartData.push(value.length);
    });
    this.doughnutNationalityChartLabels = NationalityChartLabels;
    this.doughnutNationalityChartData = [NationalityChartData];
  }

  assigndoughnutSourceChartData(dateWiseData: any[]) {
    var self = this;
    this.doughnutSourceChartData=_.map(_.groupBy(dateWiseData, 'source'),function(val){
      return self.getDataCount(val);
    })
  }

  assignDatatoBarChart(dateWiseData) {
    let dates = [];
    let reportedSympoMaticByDates = [];
    let confirmedCasesByDates = [];
    let dischargedByDates = []
    _.forEach(dateWiseData, function (data) {
      dates.push(data.confirmedAt.slice(0, -5));
      reportedSympoMaticByDates.push(data['reportedSympoMaticByDates'] || 0);
      confirmedCasesByDates.push(data['confirmedCasesByDates'] || 0);
      dischargedByDates.push(data['dischargedByDates'] || 0);
    });
    this.barChartLabels = dates;
    this.barChartData = [
      { data: reportedSympoMaticByDates, label: 'REPORTED SYMPTOMATIC', stack: 'a' },
      { data: confirmedCasesByDates, label: 'CONFIRMED CASES', stack: 'a' },
      { data: dischargedByDates, label: ' DISCHARGED', stack: 'a' }
    ];
  }

  assigndoughnutChartData(dateWiseData: any[]) {
    var self = this;
    this.doughnutChartData=_.map(_.groupBy(dateWiseData, 'gender'),function(val){
      return self.getDataCount(val);
    })
  }

  assignConfimedLineChartData(dateWiseData) {
    let self = this;
    if(dateWiseData.length){
      _.forEach(dateWiseData, function (value, key) {
        if(value.confirmedCasesByDates){
          self.lineChartConfirmedSourceLabels.push(value.confirmedAt); 
          self.lineChartConfirmedData[0].data.push(value.confirmedCasesByDates);
          self.totalConfirmedCases += value.confirmedCasesByDates;
        }      
      }); 
    } else {
      self.lineChartConfirmedSourceLabels = [];
      self.lineChartConfirmedData[0].data = [];
    }
   
    this.totalCases += self.totalConfirmedCases;
  }

  assignHospitalisedLineChartData(dateWiseData) {
    let self = this;
    if (dateWiseData.length) {
      _.forEach(dateWiseData, function (value, key) {
        if (value.confirmedCasesByDates || value.reportedSympoMaticByDates) {
          self.lineChartSymptomaticSourceLabels.push(value.confirmedAt);
          let totalHospitalisedCases = (value.confirmedCasesByDates || 0) + (value.reportedSympoMaticByDates || 0);
          self.lineChartSymptomaticData[0].data.push(totalHospitalisedCases);
          self.totalHospitalisedCases += totalHospitalisedCases;
        }
      });
    } else {
      self.lineChartSymptomaticSourceLabels = [];
      self.lineChartSymptomaticData[0].data = [];
    }
    this.totalCases += self.totalHospitalisedCases;
  }
  
  assignIntensiveLineChartData(dateWiseData){
    let self = this;
    if (dateWiseData.length) {
      _.forEach(dateWiseData, function (value, key) {
        if (value.icuByDate) {
          self.lineChartIntensiveSourceLabels.push(value.confirmedAt);
          self.lineChartIntensiveData[0].data.push(value.icuByDate);
          self.totalIntesiveCases += value.icuByDate;
        }
      });
    } else {
      self.lineChartIntensiveSourceLabels = [];
      self.lineChartIntensiveData[0].data = [];
    }
    this.totalCases += self.totalIntesiveCases;
  }

  assignDischargedLineChartData(dateWiseData){
    let self = this;    
    _.forEach(dateWiseData, function (value, key) {
      if(value.dischargedByDates){ 
        debugger   
        self.lineChartDischargeSourceLabels.push(value.confirmedAt); 
        self.lineChartDischargeData[0].data.push(value.dischargedByDates);
        self.totalDischargedCases += value.dischargedByDate;
      }      
    }); 
    this.totalCases += self.totalDischargedCases;
  }

  dateFilterChanged(event) {
    event[0].setHours(0, 0, 0, 0);
    event[1].setHours(23, 59, 59, 999);    
    this.startDate = event[0].toLocaleDateString("en-US", Option);
    this.endDate = event[1].toLocaleDateString("en-US", Option);
    var filteredData = _.filter(this.patientsData, function (patient) {
      let patientsDate = new Date(patient.confirmedAt);
      if (patientsDate >= event[0] && patientsDate <= event[1]) {
        return patient;
      }
    });
    this.resetChartsAndData();
    this.prepareBarChartData(filteredData);
    this.assigndoughnutNationalityChartData(filteredData);
  }

  resetChartsAndData(){
    this.totalCases = 0;
    this.totalConfirmedCases = 0;
    this.totalHospitalisedCases = 0; 
    this.totalIntesiveCases = 0; 
    this.totalDischargedCases = 0;    
  }

}

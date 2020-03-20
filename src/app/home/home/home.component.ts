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
  public minDate=new Date('30 jan 2020');
  public maxDate = new Date();
  public totalCases = 0;
  public totalConfirmedCases = 0;
  public totalHospitalisedCases = 0;
  public totalIntesiveCases = 0;
  public totalDischargedCases = 0;
  public totalDeathCases = 0;
  public maleCount =0 ;
  public femaleCount = 0;
  public totalImportedTransmission = 0;
  public totalLocalTransmission = 0;
  public totalFemaleCases = 0;
  public totalMaleCases = 0;

  bsRangeValue: Date[];
  public startDate: any = new Date("30 January 2020");
  public endDate: any = new Date();

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

  //Statewise Bar chart
  public stateBarChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      labels: {
        anchor: 'end',
        align: 'end',
      }
    }

  };

  public stateBarChartLabels: Label[] = [];
  public stateBarChartLegend = true;
  public stateBarChartPlugins = [];
  public stateBarChartColor = [
    {
      backgroundColor: []
    }
  ];
  public stateBarChartData: ChartDataSets[] = [
    { data: [], label: 'State', stack: 'a' }
  ];


  // Doughnut charts
  public doughnutChartType: ChartType = 'doughnut';

  //Doughnut Gender
  public doughnutChartLabels: Label[] = [];
  public doughnutChartData: MultiDataSet = [
    []
  ];
  public pieChartGenderOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'bottom',
    }
  };
  public pieChartGenderColors = [
    {
      backgroundColor: [
        '#ffa1b5',
        '#86c7f3'        
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
  public doughnutSourceChartLabels: Label[] = [];
  public doughnutSourceChartData: MultiDataSet = [
    []
  ];

  public pieChartSourceOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'bottom'
    }
  };

  public doughnutSourceChartColors = [
    {
      backgroundColor: [
        '#86c7f3',
        '#ffa1b5'
      ]
    }
  ];

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

  //Cumulate confirm cases line chart
  //
  public cumulativeChartConfirmData: ChartDataSets[] = [
    { data: [], label: 'CONFIRMED CASES', lineTension: 0, pointBackgroundColor: 'rgba(0, 0, 0, 0)', pointBorderColor: 'rgba(0, 0, 0, 0)' }
  ];
  public cumulativeChartConfirmLabels: Label[] = [];
  public cumulativeChartConfirmOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    annotation: true,
    scales: {
      xAxes: [
        {
          display: true
        }
      ],
      yAxes: [
        {
          display: true
        }
      ]
    }
  };
  public cumulativeChartConfirmColors: Color[] = [
    {
      borderColor: '#ffa1b5',
      backgroundColor: 'rgba(0,0,0,0)',
      pointBackgroundColor: '#FF0000',
      pointBorderColor: '#fff',
    }
  ];
  //Confirmed card Line chart
  public lineChartConfirmedData: ChartDataSets[] = [
    { data: [], label: 'CONFIRMED CASES', lineTension: 0, pointBackgroundColor: 'rgba(0, 0, 0, 0)', pointBorderColor: 'rgba(0, 0, 0, 0)' }
  ];
  public lineChartConfirmedSourceLabels: Label[] = [];
  public lineChartConfirmedSourceOptions: (ChartOptions & { annotation: any }) = {
    tooltips: { enabled: false },
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
    tooltips: { enabled: false },
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
    tooltips: { enabled: false },
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

  //Death card line chart 
  public lineChartDeathData: ChartDataSets[] = [
    { data: [], label: 'DEATH CASES', lineTension: 0, pointBackgroundColor: 'rgba(0, 0, 0, 0)', pointBorderColor: 'rgba(0, 0, 0, 0)' }
  ];
  public lineChartDeathLabels: Label[] = [];
  public lineChartDeathOptions: (ChartOptions & { annotation: any }) = {
    tooltips: { enabled: false },
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
  public lineChartDeathColors: Color[] = [
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
    tooltips: { enabled: false },
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
  public patientsData: any;

  constructor(private patientsDataService: PatientsDataService) { }

  ngOnInit() {
    this.bsRangeValue = [this.startDate, this.endDate];

    this.patientsDataService.patientsData.subscribe(data => {
      if(data){
        this.patientsData = data;
        this.dateFilterChanged([this.startDate, this.endDate]);        
      }
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
    this.assignDatatoBarChart(patientRecords);
    this.assigndoughnutChartData(patientRecords);
    this.assigndoughnutSourceChartData(patientRecords);
    this.assignLineChartData(patientRecords);
    this.assignConfimedLineChartData(dateWiseData);
    this.assignHospitalisedLineChartData(dateWiseData);
    this.assignDischargedLineChartData(dateWiseData);
    this.assignIntensiveLineChartData(dateWiseData);
  }

  assignLineChartData(dateWiseData: any[]) {
    let chartLabels = [];
    let chartDataOfMales = [];
    let chartDataOfFemales = [];
    let chartDataOfImported = [];
    let chartDataOfLocal = [];
    if (dateWiseData.length == 1) {
      dateWiseData = _.concat({ "confirmAt": new Date(new Date().setDate(new Date(dateWiseData[0].confirmAt).getDate() - 1)) }, dateWiseData);
    }
    _.forEach(_.groupBy(dateWiseData, 'confirmAt'), function (value, key) {
      chartLabels.push(key);
      let genderWiseData = _.groupBy(value, 'gender');
      chartDataOfMales.push(genderWiseData.Male ? genderWiseData.Male.length : 0);
      chartDataOfFemales.push(genderWiseData.Female ? genderWiseData.Female.length : 0);
      let transmissionSourceWiseData = _.groupBy(value, 'source');
      chartDataOfImported.push(transmissionSourceWiseData["Imported Cases"] ? transmissionSourceWiseData["Imported Cases"].length : 0);
      chartDataOfLocal.push(transmissionSourceWiseData["Local Transmission"] ? transmissionSourceWiseData["Local Transmission"].length : 0);
    });

    chartDataOfImported.map(x=>this.totalImportedTransmission += x);
    chartDataOfLocal.map(x=>this.totalLocalTransmission += x);
    chartDataOfMales.map(x=>this.totalMaleCases += x);
    chartDataOfFemales.map(x=>this.totalFemaleCases += x);

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

  assignCumulativeConfirmChartData(filteredData){
    let dateWiseData = filteredData.sort((a,b)=>{
      let dateA = new Date(a.confirmAt);
      let dateB =new Date(b.confirmAt);
      return dateA.getTime() - dateB.getTime();
    });

    this.cumulativeChartConfirmLabels = [];
    this.cumulativeChartConfirmData[0].data = [];
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
    let dateWiseConfirm = _.groupBy(dateWiseData,'confirmAt');
    let count = 0;

    for(let confirmdate in dateWiseConfirm){
      count += dateWiseConfirm[confirmdate].length;
      let label = `${new Date(confirmdate).getDate()} ${months[new Date(confirmdate).getMonth()]} ${new Date(confirmdate).getFullYear()}`;
      this.cumulativeChartConfirmLabels.push(label);
      this.cumulativeChartConfirmData[0].data.push(count);
    }
     
    
  }

  getDataCount(data: any): any {
    return data.length;
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
    this.doughnutSourceChartLabels = []; 
    this.doughnutSourceChartData = [[]];
    let groupBySource = _.groupBy(dateWiseData, 'source');
    for(let source in groupBySource){       
        this.doughnutSourceChartLabels.push(source);
        this.doughnutSourceChartData[0].push(self.getDataCount(groupBySource[source]));
    }
  }

  assignDatatoBarChart(dateWiseData) {
    let dates = [];
    let intensiveCasesByDates = [];
    let confirmedCasesByDates = [];
    let dischargedByDates = []
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
    dateWiseData.sort((a,b)=>{
      let dateA = new Date(a.confirmAt);
      let dateB =new Date(b.confirmAt);
      return dateA.getTime() - dateB.getTime();
    });
    let dateWiseCases = _.groupBy(dateWiseData, 'confirmAt');
    for(let cases in dateWiseCases){
      dates.push(new Date(cases).getDate() + " " + months[new Date(cases).getMonth()]);
      intensiveCasesByDates.push(_.groupBy(dateWiseData, 'confirmAt')[cases].filter(x=>x.caseType == "Intensive Care").length);
      confirmedCasesByDates.push(_.groupBy(dateWiseData, 'confirmAt')[cases].filter(x=>x.caseType == "Confirmed").length);
      dischargedByDates.push(_.groupBy(dateWiseData, 'confirmAt')[cases].filter(x=>x.caseType == "Recovered/Discharged").length);
    }

    this.barChartLabels = dates;
    this.barChartData = [
      { data: intensiveCasesByDates, label: 'INTENSIVE CARE CASES', stack: 'a' },
      { data: confirmedCasesByDates, label: 'CONFIRMED CASES', stack: 'a' },
      { data: dischargedByDates, label: ' DISCHARGED', stack: 'a' }
    ];
  }

  assigndoughnutChartData(dateWiseData: any[]) {
    this.doughnutChartLabels = [];
    this.doughnutChartData = [[]];
    let groupByGender = _.groupBy(dateWiseData, 'gender');
    for(let gender in groupByGender){ 
      if(gender == 'Male' || gender == 'Female'){
        gender == 'Male' ? this.maleCount = this.getDataCount(groupByGender['Male']) : this.femaleCount = this.getDataCount(groupByGender['Female']);
        this.doughnutChartLabels.push(gender);
        this.doughnutChartData[0].push(this.getDataCount(groupByGender[gender]));
      }
    }
  }

  assignConfimedLineChartData(dateWiseData) {
    let self = this;
    self.lineChartConfirmedSourceLabels = [];
    self.lineChartConfirmedData[0].data = [];
    if (dateWiseData.length) {
      _.forEach(dateWiseData, function (value, key) {
        if (value.confirmedCasesByDates) {
          self.lineChartConfirmedSourceLabels.push(value.confirmAt);
          self.lineChartConfirmedData[0].data.push(value.confirmedCasesByDates);
        }
      });
    } 
  }

  assignHospitalisedLineChartData(dateWiseData) {
    let self = this;
    self.lineChartSymptomaticSourceLabels = [];
    self.lineChartSymptomaticData[0].data = [];
    if (dateWiseData.length) {
      _.forEach(dateWiseData, function (value, key) {
        if (value.confirmedCasesByDates || value.reportedSympoMaticByDates) {
          self.lineChartSymptomaticSourceLabels.push(value.confirmAt);
          let totalHospitalisedCases = (value.confirmedCasesByDates || 0) + (value.reportedSympoMaticByDates || 0);
          self.lineChartSymptomaticData[0].data.push(totalHospitalisedCases);
        }
      });
    } 
  }

  assignIntensiveLineChartData(dateWiseData) {
    let self = this;
    this.lineChartIntensiveSourceLabels = [];
    this.lineChartIntensiveData[0].data = [];
    if (dateWiseData.length) {
      _.forEach(dateWiseData, function (value, key) {
        if (value.icuByDate) {
          self.lineChartIntensiveSourceLabels.push(value.confirmAt);
          self.lineChartIntensiveData[0].data.push(value.icuByDate);
        }
      });
    }
  }

  assignDeathLineChartData(dateWiseData) {
    let self = this;
    self.lineChartDeathLabels = [];
    self.lineChartDeathData[0].data = [];
    if (dateWiseData.length) {
     let deathCases =  _.groupBy(dateWiseData,'status').DIED;
      if(deathCases){
        let dateWiseCases = _.groupBy(deathCases,'confirmAt');
        for(let dateCase in dateWiseCases){
          self.lineChartDeathLabels.push(dateCase);
          self.lineChartDeathData[0].data.push(dateWiseCases[dateCase].length);
        }
      }
    } 
  }

  assignDischargedLineChartData(dateWiseData) {
    let self = this;
    self.lineChartDischargeSourceLabels = [];
    self.lineChartDischargeData[0].data = [];
    if (dateWiseData.length) {
      _.forEach(dateWiseData, function (value, key) {
        if (value.dischargedByDates) {
          self.lineChartDischargeSourceLabels.push(value.confirmAt);
          self.lineChartDischargeData[0].data.push(value.dischargedByDates);
        }
      });
    } 
  }

  assignStateBarChartDate(dateWiseData) {
    this.stateBarChartLabels = [];
    this.stateBarChartData[0].data = [];
    if (dateWiseData.length) {
      var states = _.groupBy(dateWiseData, 'state');
      for (let state in states) {
        this.stateBarChartLabels.push(state);
        this.stateBarChartData[0].data.push(states[state].length);
        this.stateBarChartColor[0].backgroundColor.push(`rgba(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},0.50)`);
      };
    }
  }

  dateFilterChanged(event) {
    if(!event) return;

    event[0].setHours(0, 0, 0, 0);
    event[1].setHours(23, 59, 59, 999);
    this.startDate = event[0];
    this.endDate = event[1];
    var filteredData = _.filter(this.patientsData, function (patient) {
      let patientsDate = new Date(patient.confirmAt);
      if (patientsDate >= event[0] && patientsDate <= event[1]) {
        return patient;
      }
    });
    this.setCasesAnalytics(filteredData);
    this.prepareBarChartData(filteredData);
    this.assigndoughnutNationalityChartData(filteredData);
    this.assignStateBarChartDate(filteredData);
    this.assignDeathLineChartData(filteredData);
    this.assignCumulativeConfirmChartData(filteredData);
  }

  setCasesAnalytics(filteredData){
    this.totalCases = this.totalConfirmedCases = filteredData.length;
    this.totalHospitalisedCases = filteredData.filter(x => x.status == "HOSPITALIZED").length;
    this.totalDeathCases = filteredData.filter(x => x.status == "DIED").length;
    this.totalDischargedCases = filteredData.filter(x => x.status == "RECOVERED").length;
    this.totalIntesiveCases = filteredData.filter(x => x.caseType == "Intensive Care").length;
    this.maleCount =0 ;
    this.femaleCount = 0;
    this.totalImportedTransmission = 0;
    this.totalLocalTransmission = 0;
    this.totalFemaleCases = 0;
    this.totalMaleCases = 0;
  }

}
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
  public minDate=new Date('jan 2020');
  //stacked chart
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] =[];
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
  public  months= ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
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
    { data: [10, 12, 10, 8, 15, 18, 14, 17, 21, 23], label: 'CONFIRMED CASES', lineTension: 0, pointBackgroundColor: 'rgba(0, 0, 0, 0)', pointBorderColor: 'rgba(0, 0, 0, 0)' }
  ];
  public lineChartConfirmedSourceLabels: Label[] = this.months;
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
  public startDate: any;
  public endDate: any;
  public patientsData: any;

  constructor( private patientsDataService : PatientsDataService) { }

  ngOnInit() {
    this.patientsDataService.patientsData.subscribe(data=>{
      this.patientsData=data;
      this.loadDataintoComponent(this.patientsData);
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
  loadDataintoComponent(patientRecords: any) {
    this.prepareBarChartData(patientRecords);
    this.assigndoughnutNationalityChartData(patientRecords);
  }
  prepareBarChartData(patientRecords: any) {
  const months= ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    var dateWiseData=[];
    var self = this;
    _.forEach(patientRecords,function(patient){
      let patientsDate=new Date(patient.confirmedAt);
        var foundDAta=_.find(dateWiseData,function(x){ 
          if(new Date(x.confirmedAt).getDate() == patientsDate.getDate()){
            if(new Date(x.confirmedAt).getMonth() == patientsDate.getMonth()){
              if(new Date(x.confirmedAt).getFullYear() == patientsDate.getFullYear()){
                return true;
              }
            }
          }
        })
        if(foundDAta){
          foundDAta=self.filterDataByCasetype(foundDAta,patient);
        }else{
          let data={};
          data["confirmedAt"]= patientsDate.getDate() + " " +  months[patientsDate.getMonth()] + " " +  patientsDate.getFullYear();
          data["confirmedInMonth"] = months[patientsDate.getMonth()];
          data=self.filterDataByCasetype(data,patient);
          dateWiseData.push(data);
        }
    })
    dateWiseData=_.sortBy(dateWiseData, function(x) { return new Date(x.confirmedAt); });
    this.assignDatatoBarChart(dateWiseData);
    this.assigndoughnutChartData(dateWiseData);
    this.assigndoughnutSourceChartData(dateWiseData);
    this.assignLineChartData(dateWiseData);
    
  }

  assignLineChartData(dateWiseData: any[]) {
    let chartLabels=[];
    let chartDataOfMales=[];
    let chartDataOfFemales = [];
    let chartDataOfImported=[];
    let chartDataOfLocal =[];
    var data=_.groupBy(dateWiseData, 'confirmedInMonth');
    _.forEach(data, function(value, key) {
     chartLabels.push(key);
     let genderWiseData=_.groupBy(value, 'gender');
     chartDataOfMales.push(genderWiseData.Male? genderWiseData.Male.length : 0);
     chartDataOfFemales.push(genderWiseData.Female ? genderWiseData.Female.length :  0);
     let transmissionSourceWiseData=_.groupBy(value, 'source');
     chartDataOfImported.push(transmissionSourceWiseData.Imported ? transmissionSourceWiseData.Imported.length : 0);
     chartDataOfLocal.push(transmissionSourceWiseData.Local ? transmissionSourceWiseData.Local.length :  0);
    });
    this.lineChartLabels=this.lineChartInfectionSourceLabels=chartLabels;
    this.lineChartData= [
      { data: chartDataOfMales, label: 'Male', lineTension: 0, pointBackgroundColor: 'rgba(0, 0, 0, 0)', pointBorderColor: 'rgba(0, 0, 0, 0)' },
      { data: chartDataOfFemales, label: 'Female', lineTension: 0, pointBackgroundColor: 'rgba(0, 0, 0, 0)', pointBorderColor: 'rgba(0, 0, 0, 0)' },
    ];
    this.lineChartInfectionSourceData= [
      { data: chartDataOfImported, label: 'IMPORTED CASE', lineTension: 0, pointBackgroundColor: 'rgba(0, 0, 0, 0)', pointBorderColor: 'rgba(0, 0, 0, 0)' },
      { data: chartDataOfLocal, label: 'LOCAL TRANSMISSION', lineTension: 0, pointBackgroundColor: 'rgba(0, 0, 0, 0)', pointBorderColor: 'rgba(0, 0, 0, 0)' },
    ];

  }

  assigndoughnutNationalityChartData(patientRecords: any[]) {
    let NationalityChartLabels=[];
    let NationalityChartData=[];
    var data=_.groupBy(patientRecords, 'nationality');
    _.forEach(data, function(value, key) {
      NationalityChartLabels.push(key);
      NationalityChartData.push(value.length);
    });
    this.doughnutNationalityChartLabels=NationalityChartLabels;
    this.doughnutNationalityChartData=[NationalityChartData];
  }

  assigndoughnutSourceChartData(dateWiseData: any[]) {
     var imported = 0; var local = 0;
    _.forEach(dateWiseData , function(p){
      if(p.source=="Imported"){
        imported+=(p.confirmedCasesByDates || 0) + (p.reportedSympoMaticByDates || 0) + (p.dischargedByDates || 0);
      }else if(p.source=="Local"){
        local+=(p.confirmedCasesByDates || 0) + (p.reportedSympoMaticByDates || 0) + (p.dischargedByDates || 0);
      }
    });
    this.doughnutSourceChartData= [[imported,local]];
  }

  assignDatatoBarChart(dateWiseData){
    let dates=[];
    let reportedSympoMaticByDates=[];
    let confirmedCasesByDates=[];
    let dischargedByDates=[]
    _.forEach(dateWiseData,function(data){
      dates.push(data.confirmedAt.slice(0,-5));
      reportedSympoMaticByDates.push(data['reportedSympoMaticByDates'] || 0);
      confirmedCasesByDates.push(data['confirmedCasesByDates'] || 0);
      dischargedByDates.push(data['dischargedByDates'] || 0);
    });
    this.barChartLabels=dates;
    this.barChartData = [
        { data: reportedSympoMaticByDates, label: 'REPORTED SYMPTOMATIC', stack: 'a' },
        { data: confirmedCasesByDates, label: 'CONFIRMED CASES', stack: 'a' },
        { data: dischargedByDates, label: ' DISCHARGED', stack: 'a' }
      ];
  }

  assigndoughnutChartData(dateWiseData: any[]) {
    var males = 0; var females = 0;
    _.forEach(dateWiseData , function(p){
      if(p.gender=="Male"){
        males+=(p.confirmedCasesByDates || 0) + (p.reportedSympoMaticByDates || 0) + (p.dischargedByDates || 0);
      }else if(p.gender=="Female"){
        females+=(p.confirmedCasesByDates || 0) + (p.reportedSympoMaticByDates || 0) + (p.dischargedByDates || 0);
      }
    });
    this.doughnutChartData= [[males,females]];
  }

  filterDataByCasetype(data: {},patient:any): {} {
    if(patient.caseType == 'confirmed'){
      data['confirmedCasesByDates']=data['confirmedCasesByDates'] + 1 || 1 ;
    }
    if(patient.caseType == 'symptomatic'){
      data['reportedSympoMaticByDates']=data['reportedSympoMaticByDates'] + 1 || 1;
    }
    if(patient.caseType == 'discharged'){
      data['dischargedByDates']=data['dischargedByDates'] + 1 || 1;
    }
    data["gender"]=patient.gender;
    data["source"]=patient.source;
    data["nationalty"]=patient.nationalty;
    return data;
  }

  dateFilterChanged(event){
    // let reportedSympoMatic=[];
    // let confirmedCases=[];
    // let discharged=[];
    // var self=this;
    // this.startDate=event[0].toLocaleDateString("en-US" , Option);
    // this.endDate=event[1].toLocaleDateString("en-US", Option);
    // event[0].setHours(0,0,0,0);
    // this.barChartLabels=_.filter(this.dates,function(d,i){
    //   let date=new Date(d +  "2020");
    //   if(date>=event[0]   && date<=event[1]){
    //     reportedSympoMatic.push(self.reportedSympoMaticByDates[i] || 0);
    //     confirmedCases.push(self.confirmedCasesByDates[i] || 0);
    //     discharged.push(self.dischargedByDates[i] || 0 );
    //     return d;
    //   }
    // });
    // this.barChartData= [
    //   { data: reportedSympoMatic, label: 'REPORTED SYMPTOMATIC', stack: 'a' },
    //   { data:confirmedCases , label: 'CONFIRMED CASES', stack: 'a' },
    //   { data:discharged , label: ' DISCHARGED', stack: 'a' }
    // ];

    // this.lineChartInfectionSourceLabels=this.lineChartLabels= _.filter(this.months,function(month){
    //   let date=new Date(month +  "2020");
    //   if((event[0].getMonth()==date.getMonth()) || (event[1].getMonth()==date.getMonth()) || (date>= event[0] && date<=event[1])){
    //     return month;
    //   }
      
    // });

    //
      var filteredData=_.filter(this.patientsData,function(patient){
        let patientsDate=new Date(patient.confirmedAt);
        event[0].setHours(0,0,0,0);
        if(patientsDate>=event[0]   && patientsDate<=event[1]){
          return patient;
        }
      });
      this.loadDataintoComponent(filteredData);
    //
  }

}

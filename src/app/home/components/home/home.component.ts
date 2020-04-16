import { Component, OnInit, ViewChild, setTestabilityGetter } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { MultiDataSet, Label, Color } from 'ng2-charts';
import * as _ from 'lodash';
import * as moment from 'moment';
declare var twttr:any;

import { PatientsDataService } from 'src/app/services/patients-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public minDate = new Date('30 jan 2020');
  public maxDate = new Date();
  public totalCases = 0;
  public totalConfirmedCases = 0;
  public totalHospitalisedCases = 0;
  public totalIntesiveCases = 0;
  public totalDischargedCases = 0;
  public totalDeathCases = 0;
  // public maleCount = 0;
  // public femaleCount = 0;
  public totalConfirmUpCasesCount = 0;
  public totalConfirmDownCasesCount = 0;
  public chartColors = [
    {
      backgroundColor: ["#86C7F3", "#FFA1B5", "#FFE29A", "#FFC7F7", "#E4FF90", "#FFB2B2", "#C5D0D2", "#B8FDE1",
        "#DCEDC1", "#E2CFD8", "#FFF8D3", "#E6E6FA", "#EFE0C6", "#D2E2E2", "#A8FFA8", "#FFFF89", "#FFC3A0",
        "#C39797", "#A3C7C5", "#E8DAD0", "#E0B9BB", "#CCD89D", "#AF9AAF", "#9E9ED6", "#AC72E2", "#A7A2A2",
        "#FFC967", "#C2C9B4", "#D0A892", "#D8F4AF", "#F5FCC1", "#84A9AC", "#698474", "#F8DC88", "#CC0E74"]
    }
  ];
  public dateWisePateintData: any = [];

  bsRangeValue: Date[];
  public startDate: any = new Date("30 January 2020");
  public endDate: any = new Date();

  //stacked chart
  // public barChartOptions: ChartOptions = {
  //   responsive: true,
  // };
  // public barChartLabels: Label[] = [];
  // public barChartType: ChartType = 'bar';
  // public barChartLegend = true;
  // public barChartPlugins = [];
  // public barChartData: ChartDataSets[] = [
  //   { data: [], label: 'REPORTED SYMPTOMATIC', stack: 'a' },
  //   { data: [], label: 'CONFIRMED CASES', stack: 'a' },
  //   { data: [], label: ' DISCHARGED', stack: 'a' }
  // ];


  //Statewise Bar chart
  public stateBarChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      labels: {
        anchor: 'end',
        align: 'end',
      }
    },
    scales: {
      yAxes: [{
        ticks: {
          autoSkip: false,
          fontSize: 11
        }
      }]
    }
  };

  public stateBarChartLabels: Label[] = [];
  public stateBarChartLegend = true;
  public stateBarChartPlugins = [];
  public stateBarChartData: ChartDataSets[] = [
    { data: [], label: 'State', stack: 'a' }
  ];


  // Doughnut charts
  public doughnutChartType: ChartType = 'doughnut';

  //Doughnut Gender
  // public doughnutChartLabels: Label[] = [];
  // public doughnutChartData: MultiDataSet = [
  //   []
  // ];
  // public pieChartGenderOptions: ChartOptions = {
  //   responsive: true,
  //   legend: {
  //     position: 'bottom',
  //   },
  //   tooltips: {
  //     callbacks: {
  //       label: function (tooltipItem, data) {
  //         let tooltipLabel = data.datasets[tooltipItem.datasetIndex].label || ''
  //         let tooltipValue = parseInt(data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index].toString());
  //         let total = 0;
  //         tooltipLabel = data.labels[tooltipItem.index].toString();
  //         data.datasets[tooltipItem.datasetIndex].data.forEach(function (dataValue) {
  //           total += dataValue;
  //         });
  //         tooltipValue = tooltipValue >= 0 ? tooltipValue : 0;
  //         let percentageValue = ((tooltipValue * 100) / total).toFixed(0);
  //         if (tooltipLabel) {
  //           tooltipLabel += ': ' + percentageValue;
  //         }
  //         return tooltipLabel + "%";
  //       }
  //     }
  //   }
  // };
  // public pieChartGenderColors = [
  //   {
  //     backgroundColor: [
  //       '#ffa1b5',
  //       '#86c7f3'
  //     ]
  //   }
  // ];

  //Line charts
  public lineChartLegend = false;
  public lineChartType = 'line';
  public lineChartPlugins = [];
  //card charts
  public cardLineChartOptions: (ChartOptions & { annotation: any }) = {
    tooltips: { enabled: false },
    responsive: true,
    annotation: false,
    scales: {
      xAxes: [{
        display: false
      }],
      yAxes: [{
        display: false
      }]
    }
  };
  //Confirmed card Line chart
  public lineChartConfirmedData: ChartDataSets[] = [
    { data: [], label: 'CONFIRMED CASES', lineTension: 0, pointBackgroundColor: 'rgba(0, 0, 0, 0)', pointBorderColor: 'rgba(0, 0, 0, 0)' }
  ];
  public lineChartConfirmedSourceLabels: Label[] = [];
  public lineChartConfirmedSourceColors: Color[] = [
    {
      borderColor: '#9399ff',
      backgroundColor: 'rgba(110,127,144,0)',
    }
  ];

  //Hospitalized card line chart
  public lineChartSymptomaticData: ChartDataSets[] = [
    { data: [], label: 'Hospitalised CASES', lineTension: 0, pointBackgroundColor: 'rgba(0, 0, 0, 0)', pointBorderColor: 'rgba(0, 0, 0, 0)' }
  ];
  public lineChartSymptomaticSourceLabels: Label[] = [];
  public lineChartSymptomaticSourceColors: Color[] = [
    {
      borderColor: '#fdd365',
      backgroundColor: 'rgba(110,127,144,0)',
    }
  ];

  //Intensive card line chart
  public lineChartIntensiveData: ChartDataSets[] = [
    { data: [], label: 'INTENSIVE CASES', lineTension: 0, pointBackgroundColor: 'rgba(0, 0, 0, 0)', pointBorderColor: 'rgba(0, 0, 0, 0)' }
  ];
  public lineChartIntensiveSourceLabels: Label[] = [];
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
  public lineChartDeathColors: Color[] = [
    {
      borderColor: '#fd5e53',
      backgroundColor: 'rgba(110,127,144,0)',
    }
  ];

  //Discharge card line chart
  public lineChartDischargeData: ChartDataSets[] = [
    { data: [], label: 'DISCHARGED CASES', lineTension: 0, pointBackgroundColor: 'rgba(0, 0, 0, 0)', pointBorderColor: 'rgba(0, 0, 0, 0)' }
  ];
  public lineChartDischargeSourceLabels: Label[] = [];
  public lineChartDischargeSourceColors: Color[] = [
    {
      borderColor: '#21bf73',
      backgroundColor: 'rgba(110,127,144,0)',
    }
  ];

  public patientsData: any;
  public testsConducatedData: any;
  public filteredTestConductedData: any;
  public lastDateTestConductedData: any;
  public recoveredPatientData : any = [];
  public deceasedPatientData : any = [];
  constructor(private patientsDataService: PatientsDataService) { }

  ngOnInit() {
    this.bsRangeValue = [this.startDate, this.endDate];

    this.patientsDataService.patientsData.subscribe(data => {
      if (data) {
        this.patientsData = data;
        //this.dateFilterChanged([this.startDate, this.endDate]);
        this.initData();
      }
    });

    this.patientsDataService.testsConductedData.subscribe(tests => {
      if (tests) {
        this.testsConducatedData = tests;
        this.setTestConductedData();
      }
    });

    this.patientsDataService.recoveredPatientsData.subscribe(data => {
      if(data){
        this.recoveredPatientData = data; 
        this.totalDischargedCases = data.length;
        this.setCasesAnalytics();
      }
    });

    this.patientsDataService.deceasedPatientsData.subscribe(data => {   
      if(data){
        this.deceasedPatientData = data;   
        this.totalDeathCases = data.length;
        this.setCasesAnalytics();
      }      
    });

    twttr.widgets.createTimeline(
      {
        sourceType: "list",
        ownerScreenName: "covid_19_India",
        slug: "covid_19_India"
      },
      document.getElementById("twitterTimelineWrapper")
    );

  }

  initData(){    
    // this.setTestConductedData();
    this.setCasesAnalytics();
    this.prepareBarChartData( this.patientsData);
    this.assignStateBarChartDate( this.patientsData);
    this.dateWisePateintData =  this.patientsData;
  }

  prepareBarChartData(patientRecords: any) {
    // var dateWiseData = this.patientsDataService.filterDataByDates(patientRecords);
    // this.assignNumberOfCasesLineChartData(patientRecords);
    // this.assignDatatoBarChart(patientRecords);
    //this.assigndoughnutChartData(patientRecords);
    // this.assignConfimedLineChartData(dateWiseData);
    // this.assignHospitalisedLineChartData(dateWiseData);
    // this.assignDischargedLineChartData(dateWiseData);
    // this.assignIntensiveLineChartData(dateWiseData);
  }

  getDataCount(data: any): any {
    return data.length;
  }

  getNationalityChartLabelColor(i) {
    return this.chartColors[0].backgroundColor[i];
  }

  // assignDatatoBarChart(dateWiseData) {
  //   let dates = [];
  //   let intensiveCasesByDates = [];
  //   let confirmedCasesByDates = [];
  //   let dischargedByDates = [];
  //   let deceasedByDates=[];
  //   let months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
  //   dateWiseData.sort((a, b) => {
  //     let dateA = new Date(a.confirmAt);
  //     let dateB = new Date(b.confirmAt);
  //     return dateA.getTime() - dateB.getTime();
  //   });
  //   let dateWiseCases = _.groupBy(dateWiseData, 'confirmAt');
  //   for (let cases in dateWiseCases) {
  //     dates.push(new Date(cases).getDate() + " " + months[new Date(cases).getMonth()]);
  //     intensiveCasesByDates.push(_.groupBy(dateWiseData, 'confirmAt')[cases].filter(x => x.caseType == "Intensive Care").length);
  //     confirmedCasesByDates.push(_.groupBy(dateWiseData, 'confirmAt')[cases].filter(x => x.caseType == "Confirmed" || x.caseType == "CONFIRMED" || x.caseType == "Deceased"|| x.caseType == "DECEASED").length);
  //     dischargedByDates.push(_.groupBy(dateWiseData, 'confirmAt')[cases].filter(x => x.caseType == "Recovered/Discharged").length);
  //     deceasedByDates.push(_.groupBy(dateWiseData, 'confirmAt')[cases].filter(x => x.caseType == "Deceased"|| x.caseType == "DECEASED").length);
  //   }

  //   this.barChartLabels = dates;
  //   this.barChartData = [
  //     //{ data: intensiveCasesByDates, label: 'INTENSIVE CARE CASES', stack: 'a' },
  //     { data: confirmedCasesByDates, label: 'CONFIRMED CASES', stack: 'a' },
  //     //{ data: dischargedByDates, label: ' DISCHARGED', stack: 'a' },
  //     { data: deceasedByDates, label: 'Deceased', stack: 'a' },

  //   ];
  // }

  getSortedObject(objectToSort) {
    var sortedObject = {};
    var arraysToSort = [];
    var obj: any;
    for (var o in objectToSort) {
      obj = {
        "state": o,
        "objects": objectToSort[o]
      }
      arraysToSort.push(obj);
    }
    arraysToSort.sort((a, b) => b.objects.length - a.objects.length);
    for (var i = 0; i < arraysToSort.length; i++) {
      obj = arraysToSort[i];
      sortedObject[obj.state] = obj.objects;
    }
    return sortedObject;

  }

  assignStateBarChartDate(dateWiseData) {
    this.stateBarChartLabels = [];
    this.stateBarChartData[0].data = [];
    
    if (dateWiseData.length) {
      var states = _.groupBy(dateWiseData, 'state');
      var sortedStates = this.getSortedObject(states);
      //console.log(sortedStates);
      for (let state in sortedStates) {
        this.stateBarChartLabels.push(state);
        
        this.stateBarChartData[0].data.push(sortedStates[state].length);
      };

    }
  }

  // dateFilterChanged(event) {
  //   if (!event) return;

  //   event[0].setHours(0, 0, 0, 0);
  //   event[1].setHours(23, 59, 59, 999);
  //   this.startDate = event[0];
  //   this.endDate = event[1];
  //   var filteredData = _.filter(this.patientsData, function (patient) {
  //     let patientsDate = new Date(patient.confirmAt);
  //     if (patientsDate >= event[0] && patientsDate <= event[1]) {
  //       return patient;
  //     }
  //   });
  //   this.dateWisePateintData = filteredData;
  //   this.setTestConductedData();
  //   this.setCasesAnalytics(filteredData);
  //   this.prepareBarChartData(filteredData);
  //   this.assignStateBarChartDate(filteredData);
  //   // this.assignDeathLineChartData(filteredData);
  // }

  setCasesAnalytics() {
    if(this.patientsData && this.patientsData.length){
      this.totalCases = this.totalConfirmedCases = this.patientsData.length;
      this.totalIntesiveCases = this.patientsData.filter(x => x.caseType == "Intensive Care").length;
      this.setConfirmCountDaviation(this.patientsData);
    }

    if(this.totalCases && this.totalDeathCases && this.totalDischargedCases){
      this.totalHospitalisedCases = this.totalCases - this.totalDeathCases - this.totalDischargedCases;
    }
    // if(this.recoveredPatients){
    //   this.totalDischargedCases= this.recoveredPatients;
    // }
    // this.totalHospitalisedCases = 10440;
    // this.totalDeathCases = 422;
    
    
    
    //this.totalHospitalisedCases = filteredData.filter(x => x.status == "HOSPITALIZED"|| x.status == "Hospitalized").length;    
    //this.totalDeathCases = filteredData.filter(x => x.status == "Died" || x.status == "DIED").length;
    //this.totalDischargedCases = filteredData.filter(x => x.status == "Recovered" || x.status == "RECOVERED").length;
    //this.maleCount = 0;
    //this.femaleCount = 0;    
  }

  setTestConductedData() {
    let self = this;
    this.filteredTestConductedData = _.filter(self.testsConducatedData, function (tests) {
      if (tests.ConductedOn) {
        let testDate = new Date(tests.ConductedOn);
        if (testDate <= self.endDate) {
          return tests;
        }
      }
    });

    let highestDate = new Date(Math.max.apply(null, this.filteredTestConductedData.map(function (tests) {
      return new Date(tests.ConductedOn);
    })));

    let highestDateString = `${highestDate.getFullYear()}-${('0' + (highestDate.getMonth() + 1)).slice(-2)}-${('0' + highestDate.getDate()).slice(-2)}`;
    this.lastDateTestConductedData = this.filteredTestConductedData.find(x => x.ConductedOn === highestDateString);
  }

  setConfirmCountDaviation(filteredData) {
    
    // let lastDate = `${this.endDate.getFullYear()}-${('0' + (this.endDate.getMonth() + 1)).slice(-2)}-${('0' + this.endDate.getDate()).slice(-2)}`;
    // let yesterday = new Date(lastDate);
    // yesterday = new Date(yesterday.setDate(yesterday.getDate() - 1));
    //let secondLastDate = `${yesterday.getFullYear()}-${('0' + (yesterday.getMonth() + 1)).slice(-2)}-${('0' + yesterday.getDate()).slice(-2)}`;
    let lastDate = moment(this.endDate).format("DD-MM-YYYY");
    let secondLastDate = moment().subtract(1, 'days').format("DD-MM-YYYY");
    let difference = filteredData.filter(x => x.confirmAt == lastDate).length - filteredData.filter(x => x.confirmAt == secondLastDate).length;

    if (difference >= 0) {
      this.totalConfirmUpCasesCount = difference;
      this.totalConfirmDownCasesCount = 0;
    } else {
      this.totalConfirmUpCasesCount = 0;
      this.totalConfirmDownCasesCount = -difference;
    }
  }

  /** card charts
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
      let deathCases = _.groupBy(dateWiseData, 'status').DIED;
      if (deathCases) {
        let dateWiseCases = _.groupBy(deathCases, 'confirmAt');
        for (let dateCase in dateWiseCases) {
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

  // Gender breakup doghunt chart
  // assigndoughnutChartData(dateWiseData: any[]) {
  //   this.doughnutChartLabels = [];
  //   this.doughnutChartData = [[]];
  //   let groupByGender = _.groupBy(dateWiseData, 'gender');
  //   for (let gender in groupByGender) {
  //     if (gender == 'Male' || gender == 'Female') {
  //       gender == 'Male' ? this.maleCount = this.getDataCount(groupByGender['Male']) : this.femaleCount = this.getDataCount(groupByGender['Female']);
  //       this.doughnutChartLabels.push(gender);
  //       this.doughnutChartData[0].push(this.getDataCount(groupByGender[gender]));
  //     }
  //   }
  // }
 */
}
import { Component, OnInit, ViewChild, setTestabilityGetter } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, MultiDataSet, Color } from 'ng2-charts';
import * as _ from 'lodash';
import * as moment from 'moment';
declare var twttr: any;

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
      xAxes: [{
        display: false,
        gridLines: {
          color: "rgba(0, 0, 0, 0)",
        }
      }],
      yAxes: [{
        display: true,
        gridLines: {
          color: "rgba(0, 0, 0, 0)",
        },
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
  //////////// Icmr test chart
  public doughnutIcmrChartLabels: Label[] = [];
  public doughnutIcmrChartData: MultiDataSet = [[]];

  public doughnutIcmrChartOptions: ChartOptions = {
    rotation: 1 * Math.PI,
    circumference: 1 * Math.PI,
    responsive: true,
    legend: {
      position: 'top',
    },
  };
  public doughnutIcmrChartColors = [
    {
      backgroundColor: [
        '#FF3324',
        '#C0C0C0'
      ]
    }
  ];

  ////////////////// end icmr test chart

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
      borderColor: '#FF3324',
      backgroundColor: 'rgba(110,127,144,0)',
    }
  ];

  //Hospitalized card line chart
  public lineChartActiveData: ChartDataSets[] = [
    { data: [], label: 'Hospitalised CASES', lineTension: 0, pointBackgroundColor: 'rgba(0, 0, 0, 0)', pointBorderColor: 'rgba(0, 0, 0, 0)' }
  ];
  public lineChartActiveSourceLabels: Label[] = [];
  public lineChartActiveSourceColors: Color[] = [
    {
      borderColor: '#fdd365',
      backgroundColor: 'rgba(110,127,144,0)',
    }
  ];

  //Death card line chart
  public lineChartDeathData: ChartDataSets[] = [
    { data: [], label: 'DEATH CASES', lineTension: 0, pointBackgroundColor: 'rgba(0, 0, 0, 0)', pointBorderColor: 'rgba(0, 0, 0, 0)' }
  ];
  public lineChartDeathLabels: Label[] = [];
  public lineChartDeathColors: Color[] = [
    {
      borderColor: '#C0C0C0',
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
  public filteredTestConductedData: any = [];
  public lastDateTestConductedData: any;
  public recoveredPatientData: any = [];
  public deceasedPatientData: any = [];
  constructor(private patientsDataService: PatientsDataService) { }

  ngOnInit() {
    this.bsRangeValue = [this.startDate, this.endDate];
    if (this.patientsDataService.patientsData) {
      this.patientsData = this.patientsDataService.patientsData;
      this.initData();
    }

    if (this.patientsDataService.testsConductedData) {
      this.testsConducatedData = this.patientsDataService.testsConductedData;
      this.setTestConductedData();
      this.setTestsDoughnutData();
    }

    if (this.patientsDataService.recoveredPatientsData) {
      this.recoveredPatientData = this.patientsDataService.recoveredPatientsData;
      this.totalDischargedCases = this.recoveredPatientData.length;
      this.setRecoveredLineChartData();
      this.setCasesAnalytics();
    }

    if (this.patientsDataService.deceasedPatientsData) {
      this.deceasedPatientData = this.patientsDataService.deceasedPatientsData;
      this.totalDeathCases = this.deceasedPatientData.length;
      this.setDeceasedLineChartData();
      this.setCasesAnalytics();
    }

    this.setActiveLineChartData(); 

    this.patientsDataService.titleSubject.next("India Covid-19 - Coronavirus Tracker India (Live) - Dashboard - " + this.totalConfirmedCases + " confirmed,  " + (this.totalConfirmedCases - this.totalDeathCases - this.totalDischargedCases) + " Active, " + this.totalDischargedCases + " Recovered and " + this.totalDeathCases + " deceased in India from Coronavirus aka Covid19 Outbreak");
    this.patientsDataService.metaData.next({ name: "twitter:card", content: "India Covid-19 - Coronavirus Tracker India (Live) - Dashboard - " + this.totalConfirmedCases + " confirmed, " + (this.totalConfirmedCases - this.totalDeathCases - this.totalDischargedCases) + " Active, " + this.totalDischargedCases + " Recovered and " + this.totalDeathCases + " deceased in India from Coronavirus aka Covid19 Outbreak" });
    this.patientsDataService.metaData.next({ property: "og:title", content: "India Covid-19 - https://indiacovid-19.in - Coronavirus Tracker India (Live) - Dashboard - " + this.totalConfirmedCases + " confirmed, " + (this.totalConfirmedCases - this.totalDeathCases - this.totalDischargedCases) + " Active, " + this.totalDischargedCases + " Recovered and " + this.totalDeathCases + " deceased in India from Coronavirus aka Covid19 Outbreak" });
    this.patientsDataService.metaData.next({ property: "og:description", content: "India Covid-19 - Coronavirus Tracker India (Live) - Dashboard - " + this.totalConfirmedCases + " confirmed, " + (this.totalConfirmedCases - this.totalDeathCases - this.totalDischargedCases) + " Active, " + this.totalDischargedCases + " Recovered and " + this.totalDeathCases + " deceased in India from Coronavirus aka Covid19 Outbreak which started from Wuhan, China. Coronavirus counter with new cases, historical data, and info. Daily charts, graphs, and updates" });
    this.patientsDataService.metaData.next({ name: "twitter:description", content: "India Covid-19 - Coronavirus Tracker India (Live) - Dashboard - " + this.totalConfirmedCases + " confirmed, " + (this.totalConfirmedCases - this.totalDeathCases - this.totalDischargedCases) + " Active, " + this.totalDischargedCases + " Recovered and " + this.totalDeathCases + " deceased in India from Coronavirus aka Covid19 Outbreak which started from Wuhan, China. Coronavirus counter with new cases, historical data, and info. Daily charts, graphs, and updates" });
    this.patientsDataService.metaData.next({ property: "og:site_name", content: "India Covid-19 - Coronavirus Tracker India (Live) - Dashboard - " + this.totalConfirmedCases + " confirmed,  " + (this.totalConfirmedCases - this.totalDeathCases - this.totalDischargedCases) + " Active, " + this.totalDischargedCases + " Recovered and " + this.totalDeathCases + " deceased in India from Coronavirus aka Covid19 Outbreak" });
    this.patientsDataService.metaData.next({ name: "keywords", content: "MOHFW India,COVID-19, Data Corona Virus,Outbreak in India, India COVID-19, India, India Coronavirus, Dashboard, Aggregator, Confirmed Cases,Live, Deaths,Covid 19, Awareness, Helpline, Testing Centers, Statewise, Citywise, Analytics, Worldwide, India, News, Covid News, Contact Information, Intensive Cases, ICU, Growth Rate, Discharged, Recovered, Released, death toll, stats, statistics, Wuhan, China, Virus, New Cases, historical data, graphs, charts, updates, live, tracker, covid19, hourly updates" });


    twttr.widgets.createTimeline(
      {
        sourceType: "list",
        ownerScreenName: "covid_19_India",
        slug: "covid_19_India"
      },
      document.getElementById("twitterTimelineWrapper")
    );

  }

  initData() {
    this.setCasesAnalytics();
    this.setConfimLineChartData();   
    this.assignStateBarChartDate(this.patientsData);
    this.dateWisePateintData = this.patientsData;
  }



  getDataCount(data: any): any {
    return data.length;
  }

  getNationalityChartLabelColor(i) {
    return this.chartColors[0].backgroundColor[i];
  }



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

      for (let state in sortedStates) {
        this.stateBarChartLabels.push(state);

        this.stateBarChartData[0].data.push(sortedStates[state].length);
      };

    }
  }


  setCasesAnalytics() {
    if (this.patientsData && this.patientsData.length) {
      //console.log(this.patientsData);
      this.totalCases = this.totalConfirmedCases = this.patientsData.length;
      this.totalIntesiveCases = this.patientsData.filter(x => x.caseType == "Intensive Care").length;
      this.setConfirmCountDaviation(this.patientsData);
    }

    if (this.totalCases && this.totalDeathCases && this.totalDischargedCases) {
      this.totalHospitalisedCases = this.totalCases - this.totalDeathCases - this.totalDischargedCases;
    }

  }

  setTestsDoughnutData(){
    this.doughnutIcmrChartLabels.push('Positives','Tests conducted');
    this.doughnutIcmrChartData[0].push(this.lastDateTestConductedData.PositiveCount, this.lastDateTestConductedData.IndividualTestCount);
  }

  setTestConductedData() {
    let self = this;
    this.filteredTestConductedData = _.filter(self.testsConducatedData, function (tests) {
      if (tests.ConductedOn) {
        // let testDate = new Date(tests.ConductedOn);
        let testDate = moment(tests.ConductedOn,"DD-MM-YYYY").toDate();
        if (testDate <= self.endDate) {
          return tests;
        }
      }
    });

    let highestDate = new Date(Math.max.apply(null, this.filteredTestConductedData.map(function (tests) {
      return moment(tests.ConductedOn,"DD-MM-YYYY").toDate();
    })));

    let highestDateString = moment(highestDate).format("DD-MM-YYYY");
    this.lastDateTestConductedData = this.filteredTestConductedData.find(x => x.ConductedOn === highestDateString);
  }

  setConfirmCountDaviation(filteredData) {


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

  setConfimLineChartData() {
    this.lineChartConfirmedSourceLabels = [];
    this.lineChartConfirmedData[0].data = [];
    if (this.patientsData.length) {
      var dateWiseConfirm = _.groupBy(this.patientsData, 'confirmAt');
      for (let confirmAt in dateWiseConfirm) {
        this.lineChartConfirmedSourceLabels.push(confirmAt);

        this.lineChartConfirmedData[0].data.push(dateWiseConfirm[confirmAt].length);
      };

    }
  }

  setActiveLineChartData() {
    if (this.patientsData && this.recoveredPatientData && this.deceasedPatientData) {
      this.lineChartActiveSourceLabels = [];
      this.lineChartActiveData[0].data = [];
        var dateWiseConfirm = _.groupBy(this.patientsData, 'confirmAt');
        var dateWiseRecovered = _.groupBy(this.recoveredPatientData, 'date');
        var dateWiseDeceased = _.groupBy(this.deceasedPatientData, 'date');

        for (let confirmAt in dateWiseConfirm) {
          let totalRecoveredAtDate = dateWiseRecovered[confirmAt] ? dateWiseRecovered[confirmAt].length : 0;
          let totalDeceasedAtDate = dateWiseDeceased[confirmAt] ? dateWiseDeceased[confirmAt].length : 0;
          let totalActiveCases = dateWiseConfirm[confirmAt].length - totalRecoveredAtDate - totalDeceasedAtDate;
          this.lineChartActiveSourceLabels.push(confirmAt);
          this.lineChartActiveData[0].data.push(totalActiveCases);
        };      
    }
  }

  setRecoveredLineChartData() {
    this.lineChartDischargeSourceLabels = [];
    this.lineChartDischargeData[0].data = [];
    if (this.recoveredPatientData.length) {
      var dateWiseRecovered = _.groupBy(this.recoveredPatientData, 'date');
      for (let recoveredAt in dateWiseRecovered) {
        this.lineChartDischargeSourceLabels.push(recoveredAt);

        this.lineChartDischargeData[0].data.push(dateWiseRecovered[recoveredAt].length);
      };
    }
  }

  setDeceasedLineChartData() {
    this.lineChartDeathLabels = [];
    this.lineChartDeathData[0].data = [];
    if (this.deceasedPatientData.length) {
      var dateWiseDeaths = _.groupBy(this.deceasedPatientData, 'date');
      for (let deceasedAt in dateWiseDeaths) {
        this.lineChartDeathLabels.push(deceasedAt);
        this.lineChartDeathData[0].data.push(dateWiseDeaths[deceasedAt].length);
      };
    }
  }
  
}
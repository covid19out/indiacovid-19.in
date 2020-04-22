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
  public totalCases = 0;
  public totalConfirmedCases = 0;
  public totalHospitalisedCases = 0;
  public totalDischargedCases = 0;
  public totalDeathCases = 0;
  public totalConfirmUpCasesCount = 0;
  public totalConfirmDownCasesCount = 0;
  public todaysConfirmCount = 0;
  public todaysRecoveredCount = 0;
  public todaysDeathCount = 0;
  public chartColors = [
    {
      backgroundColor: ["#86C7F3", "#FFA1B5", "#FFE29A", "#FFC7F7", "#E4FF90", "#FFB2B2", "#C5D0D2", "#B8FDE1",
        "#DCEDC1", "#E2CFD8", "#FFF8D3", "#E6E6FA", "#EFE0C6", "#D2E2E2", "#A8FFA8", "#FFFF89", "#FFC3A0",
        "#C39797", "#A3C7C5", "#E8DAD0", "#E0B9BB", "#CCD89D", "#AF9AAF", "#9E9ED6", "#AC72E2", "#A7A2A2",
        "#FFC967", "#C2C9B4", "#D0A892", "#D8F4AF", "#F5FCC1", "#84A9AC", "#698474", "#F8DC88", "#CC0E74"]
    }
  ];

  public startDate: any = new Date("30 January 2020");
  public endDate: any = new Date();

  //Line charts
  public lineChartLegend = false;
  public lineChartType = 'line';
  public lineChartPlugins = [];
  //card charts
  public cardLineChartOptions: (ChartOptions & { annotation: any }) = {
    tooltips: { enabled: false },
    responsive: true,
    annotation: false,
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
        display: false
      }],
      yAxes: [{
        display: false
      }]
    }
  };
  //Confirmed card Line chart 
  public lineChartConfirmedData: ChartDataSets[] = [
    { data: [], label: 'CONFIRMED CASES',  lineTension: 0, pointBackgroundColor: 'rgba(0, 0, 0, 0)', pointBorderColor: 'rgba(0, 0, 0, 0)' }
  ];
  public lineChartConfirmedSourceLabels: Label[] = [];
  public lineChartConfirmedSourceColors: Color[] = [
    {
      borderWidth: 2.2,
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
      borderWidth: 2.2,
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
      borderWidth: 2.2,
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
      borderWidth: 2.2,
      borderColor: '#21bf73',
      backgroundColor: 'rgba(110,127,144,0)',
    }
  ];

  public patientsData: any;
  public stateDistrictData: any;
  public testsConducatedData: any;
  public filteredTestConductedData: any = [];
  public lastDateTestConductedData: any;
  public recoveredPatientData: any = [];
  public deceasedPatientData: any = [];
  public lastUpdatedOn: string;
  constructor(private patientsDataService: PatientsDataService) { }

  ngOnInit() {
    this.getCasesData();
    this.getStateDistrictData();

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

  async getCasesData(){
    await this.patientsDataService.loadCasesData().subscribe(data => {
      this.patientsData = data;
      this.initData();
    });
  }

  async getStateDistrictData(){
    await this.patientsDataService.loadStateDistrictData().subscribe(data => {
      this.stateDistrictData = data;
    })
  }

  initData() {
    this.setCasesAnalytics();
    this.setCardLineChartsData();
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

  setCasesAnalytics() {
    let totalCases = this.patientsData.statewise.find(x => x.state.toLowerCase() == 'total');
    this.totalCases = this.totalConfirmedCases = totalCases.confirmed;
    this.todaysConfirmCount = totalCases.deltaconfirmed;
    this.todaysRecoveredCount = totalCases.deltarecovered;
    this.todaysDeathCount = totalCases.deltadeaths;   
    this.totalDischargedCases = totalCases.recovered;
    this.totalDeathCases = totalCases.deaths;
    this.totalHospitalisedCases = totalCases.active;
    this.lastUpdatedOn = moment(totalCases.lastupdatedtime,'DD/MM/YYYY HH:mm:ss',true).format('DD MMM HH:mm');
  }

  setCardLineChartsData(){
    this.lineChartConfirmedSourceLabels = [];
    this.lineChartConfirmedData[0].data = [];
    this.lineChartActiveSourceLabels = [];
    this.lineChartActiveData[0].data = [];
    this.lineChartDischargeSourceLabels = [];
    this.lineChartDischargeData[0].data = [];
    this.lineChartDeathLabels = [];
    this.lineChartDeathData[0].data = [];
    //Draw graph of last 15 days
    let latestData = this.patientsData.cases_time_series.slice(this.patientsData.cases_time_series.length-15,this.patientsData.cases_time_series.length-1)
    if(latestData){
      latestData.forEach(cases => {
        this.lineChartConfirmedSourceLabels.push(cases.date);
        this.lineChartConfirmedData[0].data.push(cases.dailyconfirmed);
        
        this.lineChartActiveSourceLabels.push(cases.date);
        this.lineChartActiveData[0].data.push(cases.totalconfirmed - cases.totaldeceased - cases.totalrecovered);
        
        this.lineChartDischargeSourceLabels.push(cases.date);
        this.lineChartDischargeData[0].data.push(cases.dailyrecovered)
        
        this.lineChartDeathLabels.push(cases.date);
        this.lineChartDeathData[0].data.push(cases.dailydeceased)
      });
    }
  }

}
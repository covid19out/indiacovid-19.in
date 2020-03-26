import { Component, OnInit } from '@angular/core';
import * as myJQuery from 'jquery';

import { PatientsDataService } from 'src/app/services/patients-data.service';

export interface StateData {
  name: string;
  totalIndianConfirmCases: number;
  totalForeignConfirmCases: number;
  totalDischargedCases: number;
  totalDeathCases: number;
  totalCount: number;
  backgroundColor:string;
}

@Component({
  selector: 'app-state-cards',
  templateUrl: './state-cards.component.html',
  styleUrls: ['./state-cards.component.scss']
})
export class StateCardsComponent implements OnInit {
  htmlString: any;
  stateWiseData: StateData[] = [];
  colorCounter: number = 0;
  dataDate: string;
 
  constructor(
    private patientsDataService: PatientsDataService
  ) { }

  ngOnInit() {
    this.patientsDataService.loadGovtData().subscribe(data => {
      this.prepareData(data);
    });
  }

  ngDoCheck() {
    // this.patientsDataService.titleSubject.next("India Covid-19 - Corona Virus MOHFW India Data (Live) - with confirmed cases and deaths in India from Covid-19 Virus Outbreak");
    // this.patientsDataService.metaData.next({name:"twitter:card" , content:"India Covid-19 - Corona Virus MOHFW India Data (Live) - with confirmed cases and deaths in India from Covid-19 Virus Outbreak"});
    // this.patientsDataService.metaData.next({name:"twitter:title" , content:"India Covid-19 - Corona Virus MOHFW India Data (Live) - with confirmed cases and deaths in India from Covid-19 Virus Outbreak"});
    // this.patientsDataService.metaData.next({property:"og:title" , content:"India Covid-19 - Corona Virus MOHFW India Data (Live) - with confirmed cases and deaths in India from Covid-19 Virus Outbreak"});
    // this.patientsDataService.metaData.next({name:"og:description" , content:"Live statistics and coronavirus tracking the number of confirmed cases, recovered patients, and death toll in India due to the COVID 19 coronavirus from Wuhan, China. Coronavirus counter with new cases, historical data, and info. Daily charts, graphs, and updates"});
    // this.patientsDataService.metaData.next({name:"twitter:description" , content:"Live statistics and coronavirus tracking the number of confirmed cases, recovered patients, and death toll in India due to the COVID 19 coronavirus from Wuhan, China. Coronavirus counter with new cases, historical data, and info. Daily charts, graphs, and updates"});
    // this.patientsDataService.metaData.next({name:"og:site_name" , content:"India Covid-19 - Corona Virus MOHFW India Data (Live) - with confirmed cases and deaths in India from Covid-19 Virus Outbreak"});
    // this.patientsDataService.metaData.next({name:"keywords" , content:"MOHFW India,COVID-19, Data Corona Virus,Outbreak in India, India COVID-19, India, India Corona Virus, Dashboard, Aggregator, Confirmed Cases,Live, Deaths,Covid 19, Awareness, Helpline, Testing Centers, Statewise, Citywise, Analytics, Worldwide, India, News, Covid News, Contact Information, Intensive Cases, ICU, Growth Rate, Discharged, Recovered, Released, death toll, stats, statistics, Wuhan, China, Virus, New Cases, historical data, graphs, charts, updates"});   
  }

  prepareData(data) {

    let self = this;
    let parser = new DOMParser();
    let parsedHtml = parser.parseFromString(data, 'text/html');
    let body = parsedHtml.getElementsByTagName("body")[0];
    this.htmlString = body.innerHTML;
  
    let stateWiseCases: StateData[] = [];
    setTimeout(function () {
      self.setDataDate();
      
      var rows = myJQuery('table')[7].tBodies[0].rows;
      
      for (let i = 0; i < rows.length - 2; i++) { //Don't  process last two row of statistics and instruction
        let $tds = myJQuery(rows[i]).find('td');
        let stateData: StateData = {
          name: $tds.eq(1).text(),
          totalIndianConfirmCases: $tds.eq(2).text(),
          totalForeignConfirmCases: $tds.eq(3).text(),
          totalDischargedCases: $tds.eq(4).text(),
          totalDeathCases: $tds.eq(5).text(),
          totalCount : parseInt($tds.eq(2).text()) + parseInt($tds.eq(3).text()) + 
                       parseInt($tds.eq(4).text()) + parseInt($tds.eq(5).text()),
          backgroundColor: self.getRandomColor()
        };
        
        stateWiseCases.push(stateData);
        
      }

      self.stateWiseData = stateWiseCases.sort((a, b) => {
        return b.totalCount - a.totalCount;
      });

      

      let $statColumns = myJQuery(rows[rows.length - 2]).find('td'); //Second Last column of total counts
      let totalStat: StateData = {
        name: 'Total Cases',
        totalIndianConfirmCases: parseInt($statColumns.eq(1).text()),
        totalForeignConfirmCases: parseInt($statColumns.eq(2).text()),
        totalDischargedCases: parseInt($statColumns.eq(3).text()),
        totalDeathCases: parseInt($statColumns.eq(4).text()),
        totalCount: parseInt($statColumns.eq(1).text()) + parseInt($statColumns.eq(2).text()) + 
                    parseInt($statColumns.eq(3).text()) + parseInt($statColumns.eq(4).text()),
        backgroundColor: self.getRandomColor()
      }
      self.stateWiseData.unshift(totalStat);
      

    }, 0);

  }

  setDataDate(){
    let headingTitleDiv = myJQuery('.newtab')[0];
    let headingText = myJQuery(headingTitleDiv).find('p > strong')[0].innerHTML;
    this.dataDate = headingText;//.substring(69,95);
  }

  getRandomColor() {
    return `rgba(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},0.20)`;   
    //let colors = ['Beige','CadetBlue','DarkCyan','DarkGrey', 'DarkSeaGreen' ]
    // console.log(colors[Math.floor(Math.random()*4)]);
    // return colors[Math.floor(Math.random()*4)];
    
    // var color = Math.floor(0x1000000 * Math.random()).toString(16);
    // return '#' + ('000000' + color).slice(-6);

  }
}

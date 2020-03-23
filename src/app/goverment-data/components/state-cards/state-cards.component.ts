import { Component, OnInit } from '@angular/core';
import * as myJQuery from 'jquery';

import { PatientsDataService } from 'src/app/services/patients-data.service';

export interface StateData {
  name: string;
  totalIndianConfirmCases: number;
  totalForeignConfirmCases: number;
  totalDischargedCases: number;
  totalDeathCases: number;
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

  prepareData(data) {

    let self = this;
    let parser = new DOMParser();
    let parsedHtml = parser.parseFromString(data, 'text/html');
    let body = parsedHtml.getElementsByTagName("body")[0];
    this.htmlString = body.innerHTML;
    // let body = parsedHtml.getElementsByTagName("strong")[15];
    // this.htmlString = body;
    
    let stateWiseCases: StateData[] = [];
    setTimeout(function () {
      self.setDataDate();
      var rows = myJQuery('table')[1].tBodies[0].rows;
      for (let i = 0; i < rows.length - 1; i++) { //Don't  process last row of statistics
        let $tds = myJQuery(rows[i]).find('td');
        let stateData: StateData = {
          name: $tds.eq(1).text(),
          totalIndianConfirmCases: $tds.eq(2).text(),
          totalForeignConfirmCases: $tds.eq(3).text(),
          totalDischargedCases: $tds.eq(4).text(),
          totalDeathCases: $tds.eq(5).text(),
          backgroundColor: self.getRandomColor()
        };
        stateWiseCases.push(stateData);
      }

      self.stateWiseData = stateWiseCases.sort((a, b) => {
        return b.totalIndianConfirmCases - a.totalIndianConfirmCases;
      });

      let $statColumns = myJQuery(rows[rows.length - 1]).find('td');
      let totalStat: StateData = {
        name: 'Total Cases',
        totalIndianConfirmCases: parseInt($statColumns.eq(1).text()),
        totalForeignConfirmCases: parseInt($statColumns.eq(2).text()),
        totalDischargedCases: parseInt($statColumns.eq(3).text()),
        totalDeathCases: parseInt($statColumns.eq(4).text()),
        backgroundColor: self.getRandomColor()
      }
      self.stateWiseData.unshift(totalStat);

    }, 0);

  }

  setDataDate(){
    let headingTitleDiv = myJQuery('.newtab')[0];
    let headingText = myJQuery(headingTitleDiv).find('p')[0].innerHTML;
    this.dataDate = headingText.substring(69,95);
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

import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

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
  constructor(
    private patientsDataService: PatientsDataService,
    private sanitization: DomSanitizer
  ) { }

  ngOnInit() {
    this.patientsDataService.loadGovtData().subscribe(data => {
      this.prepareData(data)
    });
  }

  prepareData(data) {

    let self = this;
    let parser = new DOMParser();
    let parsedHtml = parser.parseFromString(data, 'text/html');
    let body = parsedHtml.getElementsByTagName("body")[0];
    this.htmlString = body.innerHTML;
    let stateWiseCases: StateData[] = [];
    setTimeout(function () {

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

    }, 0);

  }

  getRandomColor() {
     //let colors = ['Beige','CadetBlue','DarkCyan','DarkGrey', 'DarkSeaGreen' ]
    // console.log(colors[Math.floor(Math.random()*4)]);
    // return colors[Math.floor(Math.random()*4)];

    return `rgba(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},0.50)`;   
    // var color = Math.floor(0x1000000 * Math.random()).toString(16);
    // return '#' + ('000000' + color).slice(-6);

  }
}

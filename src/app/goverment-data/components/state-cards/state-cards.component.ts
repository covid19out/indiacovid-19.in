import { Component, OnInit } from '@angular/core';
import * as myJQuery from 'jquery';

import { PatientsDataService } from 'src/app/services/patients-data.service';

export interface StateData {
  name: string;
  totalIndianConfirmCases: number;
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
  backgroundColors = ["#86C7F3", "#FFA1B5", "#FFE29A", "#FFC7F7", "#E4FF90", "#FFB2B2", "#C5D0D2", "#B8FDE1",
  "#DCEDC1", "#E2CFD8", "#FFF8D3", "#E6E6FA", "#EFE0C6", "#D2E2E2", "#A8FFA8", "#FFFF89", "#FFC3A0",
  "#C39797", "#A3C7C5", "#E8DAD0", "#E0B9BB", "#CCD89D", "#AF9AAF", "#9E9ED6", "#AC72E2", "#A7A2A2",
  "#FFC967", "#C2C9B4", "#D0A892", "#D8F4AF","#F5FCC1","#84A9AC","#698474","#F8DC88","#CC0E74"];
  constructor(
    private patientsDataService: PatientsDataService
  ) { }

  ngOnInit() {
    this.patientsDataService.loadGovtData().subscribe(data => {
      this.prepareData(data);
    });
  }

  ngDoCheck() {
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
      //console.log(myJQuery('table'));      
      var rows = myJQuery('table')[0].tBodies[0].rows;
      
      for (let i = 0; i < rows.length - 4; i++) { //Don't  process last two row of statistics and instruction
        let $tds = myJQuery(rows[i]).find('td');
        let stateData: StateData = {
          name: $tds.eq(1).text(),
          totalIndianConfirmCases: $tds.eq(2).text()-$tds.eq(3).text()-$tds.eq(4).text(),
          totalDischargedCases: $tds.eq(3).text(),
          totalDeathCases: $tds.eq(4).text(),
          totalCount : parseInt($tds.eq(2).text()),
          backgroundColor: self.getRandomColor()
        };        
        stateWiseCases.push(stateData);
      }

      self.stateWiseData = stateWiseCases.sort((a, b) => {
        return b.totalCount - a.totalCount;
      });

      

      let $statColumns = myJQuery(rows[rows.length - 4]).find('td'); //Second Last column of total counts
      let totalStat: StateData = {
        name: 'Total Cases',
        totalIndianConfirmCases: parseInt($statColumns.eq(1).text())-parseInt($statColumns.eq(2).text())-parseInt($statColumns.eq(3).text()),
        totalDischargedCases: parseInt($statColumns.eq(2).text()),
        totalDeathCases: parseInt($statColumns.eq(3).text()),
        totalCount: parseInt($statColumns.eq(1).text()),
        backgroundColor: self.getRandomColor()
      }
      self.stateWiseData.unshift(totalStat); 
    }, 0);

  }

  setDataDate(){
    let headingTitleDiv = myJQuery('.status-update')[0];
    let headingText = myJQuery(headingTitleDiv).find('span')[0].innerHTML;
    this.dataDate = headingText;//.substring(69,95);
  }

  getRandomColor() {
    let number = Math.floor(Math.random() * 35);
    return this.backgroundColors[number];
  }
}

import { Component, OnInit } from '@angular/core';
import * as myJQuery from 'jquery';

import { PatientsDataService } from 'src/app/services/patients-data.service';

export interface StateData {
  name: string;
  totalIndianConfirmCases: number;
  totalDischargedCases: number;
  totalDeathCases: number;
  totalCount: number;
  backgroundColor: string;
}

@Component({
  selector: 'app-state-cards',
  templateUrl: './state-cards.component.html',
  styleUrls: ['./state-cards.component.scss']
})

export class StateCardsComponent implements OnInit {
  htmlString: any;
  stateWiseData: StateData[] = [];
  colorCounter = 0;
  dataDate: string;
  backgroundColors = ['#86C7F3', '#FFA1B5', '#FFE29A', '#FFC7F7', '#E4FF90', '#FFB2B2', '#C5D0D2', '#B8FDE1',
  '#DCEDC1', '#E2CFD8', '#FFF8D3', '#E6E6FA', '#EFE0C6', '#D2E2E2', '#A8FFA8', '#FFFF89', '#FFC3A0',
  '#C39797', '#A3C7C5', '#E8DAD0', '#E0B9BB', '#CCD89D', '#AF9AAF', '#9E9ED6', '#AC72E2', '#A7A2A2',
  '#FFC967', '#C2C9B4', '#D0A892', '#D8F4AF','#F5FCC1','#84A9AC','#698474','#F8DC88','#CC0E74'];
  constructor(
    private patientsDataService: PatientsDataService
  ) { }

  ngOnInit() {
    this.patientsDataService.loadGovtData().subscribe(data => {
      this.prepareData(data);
    });
  }

  prepareData(data) {

    const self = this;
    const parser = new DOMParser();
    const parsedHtml = parser.parseFromString(data, 'text/html');
    const body = parsedHtml.getElementsByTagName('body')[0];
    this.htmlString = body.innerHTML;

    const stateWiseCases: StateData[] = [];
    setTimeout(function() {
      self.setDataDate();
      console.log(myJQuery('table'));
      const rows = myJQuery('table')[0].tBodies[0].rows;

      for (let i = 0; i < rows.length - 6; i++) { // Don't  process last two row of statistics and instruction
      const $tds = myJQuery(rows[i]).find('td');
      const stateData: StateData = {
          name: $tds.eq(1).text(),
          totalIndianConfirmCases: parseInt($tds.eq(2).text()) - parseInt($tds.eq(3).text()) - parseInt($tds.eq(4).text()),
          totalDischargedCases: parseInt($tds.eq(3).text()),
          totalDeathCases: parseInt($tds.eq(4).text()),
          totalCount : parseInt($tds.eq(2).text()),
          backgroundColor: self.getRandomColor()
        };
      stateWiseCases.push(stateData);
      }

      self.stateWiseData = stateWiseCases.sort((a, b) => {
        return b.totalCount - a.totalCount;
      });

      const $statColumns = myJQuery(rows[rows.length - 4]).find('td'); // Second Last column of total counts
    }, 0);

  }

  setDataDate() {
    const headingTitleDiv = myJQuery('.status-update')[0];
    const headingText = myJQuery(headingTitleDiv).find('span')[0].innerHTML;
    this.dataDate = headingText;
  }

  getRandomColor() {
    const colorNumber = Math.floor(Math.random() * 35);
    return this.backgroundColors[colorNumber];
  }
}

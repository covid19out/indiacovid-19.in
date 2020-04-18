import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { PatientsDataService } from 'src/app/services/patients-data.service';

export interface StateData {
  stateName: string;
  totalIndianConfirmCases: number;
  totalDischargedCases: number;
  totalDeathCases: number;
  totalCount: number;
  backgroundColor: string;
}

@Component({
  selector: 'app-state-wise-cards',
  templateUrl: './state-wise-cards.component.html',
  styleUrls: ['./state-wise-cards.component.scss']
})
export class StateWiseCardsComponent implements OnInit {
  patientsData: any = [];
  recoveredPatientData: any;
  deceasedPatientData: any;
  stateWiseData: StateData[] = [];
  backgroundColor = ["#86C7F3", "#FFA1B5", "#FFE29A", "#FFC7F7", "#E4FF90", "#FFB2B2", "#C5D0D2", "#B8FDE1",
    "#DCEDC1", "#E2CFD8", "#FFF8D3", "#E6E6FA", "#EFE0C6", "#D2E2E2", "#A8FFA8", "#FFFF89", "#FFC3A0",
    "#C39797", "#A3C7C5", "#E8DAD0", "#E0B9BB", "#CCD89D", "#AF9AAF", "#9E9ED6", "#AC72E2", "#A7A2A2",
    "#FFC967", "#C2C9B4", "#D0A892", "#D8F4AF","#F5FCC1","#84A9AC","#698474","#F8DC88","#CC0E74"];

  constructor(private patientsDataService: PatientsDataService) { }

  ngOnInit() {

    if(this.patientsDataService.patientsData){
      this.patientsData = this.patientsDataService.patientsData;
      this.prepareData();
    }
    if(this.patientsDataService.recoveredPatientsData){
      this.recoveredPatientData = this.patientsDataService.recoveredPatientsData;
      this.prepareData();
    }
    if(this.patientsDataService.deceasedPatientsData){
      this.deceasedPatientData = this.patientsDataService.deceasedPatientsData; 
      this.prepareData();
    }
  }

  prepareData() {
    if (this.patientsData && this.deceasedPatientData && this.recoveredPatientData) {
    let stateWiseStat: StateData[] = [];
    let stateWisePatients = _.groupBy(this.patientsData, 'state');

    for (let state in stateWisePatients) {
      if (state) {
        var patientData: StateData = this.getStateStats(state,stateWisePatients);
        stateWiseStat.push(patientData);
      }
    }

    //If state is unknown add records at first place
    if(stateWisePatients.hasOwnProperty("") || stateWisePatients.hasOwnProperty(undefined)){
      stateWiseStat.unshift(this.getStateUnconfirmedRecord(stateWisePatients));
    }
    
    this.stateWiseData = this.getSortedData(stateWiseStat);
    }
    
  }

  getStateStats(state,stateWisePatients){
    let cityWiseRecoveredData = _.groupBy(this.recoveredPatientData, 'state');
    let cityWiseDeceasedData = _.groupBy(this.deceasedPatientData, 'state');
    let confirmCasesCount = stateWisePatients[state].length;
    let recoveredCasesCount = cityWiseRecoveredData[state] ? cityWiseRecoveredData[state].length : 0;
    let deceasedCasesCount = cityWiseDeceasedData[state] ? cityWiseDeceasedData[state].length : 0;
    return {
      stateName: state == "" ? "State Not Confirmed" : state,
      totalIndianConfirmCases: confirmCasesCount,
      // totalForeignConfirmCases: stateWisePatients[state].filter(x => x.nationality !== "Indian" && x.caseType == "Confirmed").length,
      totalDischargedCases: recoveredCasesCount,
      totalDeathCases: deceasedCasesCount,
      totalCount: confirmCasesCount,
      backgroundColor: this.getRandomColor()
    };
  }

  getStateUnconfirmedRecord(stateWisePatients){
    return this.getStateStats("",stateWisePatients);
  }

  getSortedData(stateWiseStat) {
    return stateWiseStat.sort((a, b) => {
      return b.totalCount - a.totalCount;
    });
  }


  getRandomColor() {
    let number = Math.floor(Math.random() * 35);
    return this.backgroundColor[number];
  }

}

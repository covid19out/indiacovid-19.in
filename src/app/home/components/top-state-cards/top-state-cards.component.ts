import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

import { PatientsDataService } from 'src/app/services/patients-data.service';
import { StateData } from 'src/app/analytics/components/state-wise-cards/state-wise-cards.component';

export interface States{
  name: string;
  confirmed: number;
  recovered: number;
  confirmedPercentage: number;
  backgroundColor: string;
  color: string;
}

@Component({
  selector: 'app-top-state-cards',
  templateUrl: './top-state-cards.component.html',
  styleUrls: ['./top-state-cards.component.scss']
})
export class TopStateCardsComponent implements OnInit {
  patientsData:any;
  recoveredPatientData:any;
  topStates: any = [];
  stateColors = [
    { backgoundColor: "#FFF0F0", color: "#FF3324" },
    { backgoundColor: "#fff8e3", color: "#ffbf00" },
    { backgoundColor: "#E0F4E9", color: "#1BB65D" },
    { backgoundColor: "#F0F0F8", color: "#46467F" },
    { backgoundColor: "#FFEBFD", color: "#FF24EC" },
  ]

  constructor(private patientsDataService: PatientsDataService) { }
  
  ngOnInit() {
    if (this.patientsDataService.patientsData) {
      this.patientsData = this.patientsDataService.patientsData;
    }

    if (this.patientsDataService.recoveredPatientsData) {
      this.recoveredPatientData = this.patientsDataService.recoveredPatientsData;      
    }

    this.setStates();
  }

  setStates(){
    let stateWiseConfirmed = _.groupBy(this.patientsData,'state');
    let sortedStates = this.getTopFiveSortedObject(stateWiseConfirmed);
    let counter = 0;
    for(let stateName in sortedStates){
      let state: States = {
        name : stateName,
        confirmed : sortedStates[stateName].length,
        recovered: this.getStateRecoveredCount(stateName),
        confirmedPercentage: this.getConfirmedPercentage(sortedStates[stateName].length),
        backgroundColor: this.stateColors[counter].backgoundColor,
        color: this.stateColors[counter].color
      }
      counter++;
      this.topStates.push(state);
    }
      
    
  }

  getTopFiveSortedObject(objectToSort) {
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
    for (var i = 0; i < 5; i++) {
      obj = arraysToSort[i];
      sortedObject[obj.state] = obj.objects;
    }
    return sortedObject;

  }

  getStateRecoveredCount(stateName){
    let stateRecoveredCount = 0;
    let stateWiseRecovered = _.groupBy(this.recoveredPatientData,'state');
    stateRecoveredCount = stateWiseRecovered[stateName] ? stateWiseRecovered[stateName].length : 0;
    return stateRecoveredCount;
  }

  getConfirmedPercentage(confirmedCases){
    let totalCases = this.patientsData.length;
    return Math.floor(confirmedCases * 100 / totalCases);
  }

}

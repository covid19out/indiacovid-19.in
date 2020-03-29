import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import * as _ from 'lodash';

export interface StateStatistics {
  name: string,
  confirmCases: number,
  recoveredCases: number,
  deceasedCases: number,
  confirmUpCount: number,
  confirmDownCount: number,
  topFiveCities: any[],
}

export interface CityStatistics {
  name: string,
  confirmCases: number,
  recoveredCases: number,
  deceasedCases: number
}

@Component({
  selector: 'app-top-state-table',
  templateUrl: './top-state-table.component.html',
  styleUrls: ['./top-state-table.component.scss']
})
export class TopStateTableComponent implements OnInit {
  @Input() cases: any;
  @Input() endDate: any;
  topFiveStatesData:any[] = []; 
  showCityTable:boolean[] = [];

  constructor() { }

  ngOnInit() {    
  }

  ngOnChanges(changes: SimpleChanges) {
    let dateWiseCases = changes.cases.currentValue;
    if(dateWiseCases && dateWiseCases.length){
      this.topFiveStatesData = []; 
      this.showCityTable = [];
      this.setTableStatistics(dateWiseCases);
    }
  }

  setTableStatistics(filteredData){
    var stateWiseData = _.groupBy(filteredData, 'state');
    //let topFiveStates = this.getTopFiveCasesCount(stateWiseData);
    let statesData: StateStatistics[] = [];
    for(let state in stateWiseData){
      let confirmCount = this.getStateConfirmCountsDifference(state,stateWiseData);
      let stateData: StateStatistics = {
        name: state,
        confirmCases: stateWiseData[state].length,
        recoveredCases: stateWiseData[state].filter(x => x.caseType == "Recovered/Discharged").length,
        deceasedCases: stateWiseData[state].filter(x => x.caseType == "Deceased").length,
        topFiveCities: this.getTopFiveCities(stateWiseData[state]),
        confirmUpCount: confirmCount >= 0 ? confirmCount : 0,
        confirmDownCount: confirmCount < 0 ? -confirmCount : 0,
      };
      statesData.push(stateData);
    }
    //First sort by confirm cases in cases no confirm up count
    statesData = statesData.sort((a, b) => {
      return b.confirmCases - a.confirmCases;
    });

    //Sort by confirmUpCount
    statesData = statesData.sort((a, b) => {
      return b.confirmUpCount - a.confirmUpCount;
    });
    
    //Select first five states
    this.topFiveStatesData = statesData.slice(0,5);    
  }

  getTopFiveCities(cases){
    let cityWiseData = _.groupBy(cases, 'cityName');
    let topFiveCities = this.getTopFiveCasesCount(cityWiseData);
    let topFiveCitiesData = [];
    for(let city in topFiveCities){
      let cityData: CityStatistics = {
        name: city,
        confirmCases: topFiveCities[city].length,
        recoveredCases: topFiveCities[city].filter(x => x.caseType == "Recovered/Discharged").length,
        deceasedCases: topFiveCities[city].filter(x => x.caseType == "Deceased").length,
      };
      topFiveCitiesData.push(cityData);
    } 
    return topFiveCitiesData;
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

  getTopFiveCasesCount(data){
    let sortedObj = this.getSortedObject(data);
    let topFiveCases:any = {};
    for(let obj in sortedObj){
      if(obj!== ""){
        topFiveCases[obj] = sortedObj[obj];
      }
    }
    return _.chain(topFiveCases)
    .keys()
    .take(5)
    .reduce(function(memo, current) {
      memo[current] = topFiveCases[current];
      return memo;
    }, {})
    .value();    
  }

  getStateConfirmCountsDifference(state,topFiveStates){
    let lastDate = `${this.endDate.getFullYear()}-${('0' + (this.endDate.getMonth()+1)).slice(-2)}-${('0' + this.endDate.getDate()).slice(-2)}`;
    let yesterday = new Date(lastDate);
    yesterday = new Date(yesterday.setDate(yesterday.getDate() - 1));
    let secondLastDate = `${yesterday.getFullYear()}-${('0' + (yesterday.getMonth()+1)).slice(-2)}-${('0' + yesterday.getDate()).slice(-2)}`;
    let difference = topFiveStates[state].filter(x => x.confirmAt == lastDate).length - topFiveStates[state].filter(x => x.confirmAt == secondLastDate).length;
    return difference;
    // if(difference >= 0){
    //   this.totalConfirmUpCasesCount = difference;
    //   this.totalConfirmDownCasesCount = 0;
    // } else {
    //   this.totalConfirmUpCasesCount = 0;
    //   this.totalConfirmDownCasesCount = difference;
    // }
  }

}

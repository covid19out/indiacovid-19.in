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
  showCityTable:Boolean[] = [];
  toggleStateConfim: Boolean = false;
  toggleStateDeceased: Boolean = false;
  toggleStateRecovered: Boolean = false;
  toggleCityConfim: Boolean[] = [];
  toggleCityDeceased: Boolean[] = [];
  toggleCityRecovered: Boolean[] = [];

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
    // statesData = statesData.sort((a, b) => {
    //   return b.confirmUpCount - a.confirmUpCount;
    // });
    
    //Select first five states
    //this.topFiveStatesData = statesData.slice(0,5);    
    this.topFiveStatesData = statesData;    
  }

  getTopFiveCities(cases){
    let cityWiseData = _.groupBy(cases, 'cityName');
    // let topFiveCities = this.getTopFiveCasesCount(cityWiseData);
    let topFiveCitiesData = [];
    for(let city in cityWiseData){
      let cityData: CityStatistics = {
        name: city == "" ? "Not confirmed" : city,
        confirmCases: cityWiseData[city].length,
        recoveredCases: cityWiseData[city].filter(x => x.caseType == "Recovered/Discharged").length,
        deceasedCases: cityWiseData[city].filter(x => x.caseType == "Deceased").length,
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

  toggleStateConfimSort(){
    this.toggleStateConfim = !this.toggleStateConfim;
    if(this.toggleStateConfim){
      this.topFiveStatesData = this.topFiveStatesData.sort((a, b) => {
        return a.confirmCases - b.confirmCases;
      });
    } else {
      this.topFiveStatesData = this.topFiveStatesData.sort((a, b) => {
        return b.confirmCases - a.confirmCases;
      });      
    }    
  }

  toggleStateRecoveredSort(){
    this.toggleStateRecovered = !this.toggleStateRecovered;
    if(this.toggleStateRecovered){
      this.topFiveStatesData = this.topFiveStatesData.sort((a, b) => {
        return a.recoveredCases - b.recoveredCases;
      });
    } else {
      this.topFiveStatesData = this.topFiveStatesData.sort((a, b) => {
        return b.recoveredCases - a.recoveredCases;
      });      
    }    
  }

  toggleStateDeceasedSort(){
    this.toggleStateDeceased = !this.toggleStateDeceased;
    if(this.toggleStateDeceased){
      this.topFiveStatesData = this.topFiveStatesData.sort((a, b) => {
        return a.deceasedCases - b.deceasedCases;
      });
    } else {
      this.topFiveStatesData = this.topFiveStatesData.sort((a, b) => {
        return b.deceasedCases - a.deceasedCases;
      });      
    }    
  }

  toggleCityConfimSort(cities,index){
    this.toggleCityConfim[index] = !this.toggleCityConfim[index];
    if(this.toggleCityConfim[index]){
      cities = cities.sort((a, b) => {
        return a.confirmCases - b.confirmCases;
      });
    } else {
      cities = cities.sort((a, b) => {
        return b.confirmCases - a.confirmCases;
      });      
    }    
  }

  toggleCityRecoveredSort(cities,index){
    this.toggleCityRecovered[index] = !this.toggleCityRecovered[index];
    if(this.toggleCityRecovered[index]){
      cities = cities.sort((a, b) => {
        return a.recoveredCases - b.recoveredCases;
      });
    } else {
      cities = cities.sort((a, b) => {
        return b.recoveredCases - a.recoveredCases;
      });      
    }   
  }

  toggleCityDeceasedSort(cities,index){
    this.toggleCityDeceased[index] = !this.toggleCityDeceased[index];
    if(this.toggleCityDeceased[index]){
      cities = cities.sort((a, b) => {
        return a.deceasedCases - b.deceasedCases;
      });
    } else {
      cities = cities.sort((a, b) => {
        return b.deceasedCases - a.deceasedCases;
      });      
    }  
  }

}
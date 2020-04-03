import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import * as _ from 'lodash';

export interface StateStatistics {
  name: string,
  confirmCases: number,
  recoveredCases: number,
  deceasedCases: number,
  confirmUpCount: number,
  topFiveCities: any[],
  activeCases: number
}

export interface CityStatistics {
  name: string,
  confirmCases: number,
  recoveredCases: number,
  deceasedCases: number,
  confirmUpCount: number,
  activeCases: number
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
    let statesData: StateStatistics[] = [];
    for(let state in stateWiseData){
      let confirmCount = this.getEndDatesConfirmCounts(state,stateWiseData);
      let stateData: StateStatistics = {
        name: state,
        confirmCases: stateWiseData[state].length,
        activeCases: stateWiseData[state].filter(x => x.status == "HOSPITALIZED"|| x.status == "Hospitalized").length,
        recoveredCases: stateWiseData[state].filter(x => x.caseType == "Recovered/Discharged").length,
        deceasedCases: stateWiseData[state].filter(x => x.caseType == "Deceased").length,
        topFiveCities: this.getTopFiveCities(stateWiseData[state]),
        confirmUpCount: confirmCount || 0
      };
      statesData.push(stateData);
    }
    //sort by state name
    statesData.sort((a,b) => a.name.localeCompare(b.name));
    //First sort by confirm cases in cases no confirm up count
    statesData = statesData.sort((a, b) => {
      return b.confirmCases - a.confirmCases;
    });
    
    this.topFiveStatesData = statesData;    
  }

  getTopFiveCities(cases){
    let cityWiseData = _.groupBy(cases, 'cityName');
    let topFiveCitiesData = [];
    for(let city in cityWiseData){
      let cityData: CityStatistics = {
        name: city == "" ? "Unknown" : city,
        confirmCases: cityWiseData[city].length,
        activeCases: cityWiseData[city].filter(x => x.status == "HOSPITALIZED"|| x.status == "Hospitalized").length,
        recoveredCases: cityWiseData[city].filter(x => x.caseType == "Recovered/Discharged").length,
        deceasedCases: cityWiseData[city].filter(x => x.caseType == "Deceased").length,
        confirmUpCount: this.getEndDatesConfirmCounts(city,cityWiseData),
        
      };
      topFiveCitiesData.push(cityData);
    }
    //topFiveCitiesData.sort((a,b) => a.confirmCases.localeCompare(b.confirmCases));
    //topFiveCitiesData.sort((a, b) => b.confirmCases - a.confirmCases);
    topFiveCitiesData.sort((a,b) => a.name.localeCompare(b.name));
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

  getEndDatesConfirmCounts(state,topFiveStates){
    let lastDate = `${this.endDate.getFullYear()}-${('0' + (this.endDate.getMonth()+1)).slice(-2)}-${('0' + this.endDate.getDate()).slice(-2)}`;
    return topFiveStates[state].filter(x => x.confirmAt == lastDate).length;
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
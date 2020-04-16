import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import * as _ from 'lodash';
import * as moment from 'moment';
import { PatientsDataService } from 'src/app/services/patients-data.service';

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
  // @Input() cases: any;
  @Input() endDate: any;

  patientsData: any;
  recoveredPatientData: any;
  deceasedPatientData: any;
  topFiveStatesData:any[] = []; 
  showCityTable:Boolean[] = [];
  toggleStateConfim: Boolean = false;
  toggleStateDeceased: Boolean = false;
  toggleStateRecovered: Boolean = false;
  toggleCityConfim: Boolean[] = [];
  toggleCityDeceased: Boolean[] = [];
  toggleCityRecovered: Boolean[] = [];

  constructor(private patientsDataService:PatientsDataService) { }

  ngOnInit() {    
    this.topFiveStatesData = []; 
    this.showCityTable = [];

    this.patientsDataService.patientsData.subscribe(data => {
      if (data) {
        this.patientsData = data;
        this.setTableStatistics();
      }
    });

    this.patientsDataService.recoveredPatientsData.subscribe(data => {
      if(data){
        this.recoveredPatientData = data;
        this.setTableStatistics();
      }
    });

    this.patientsDataService.deceasedPatientsData.subscribe(data => {   
      if(data){
        this.deceasedPatientData = data;
        this.setTableStatistics();
      }      
    });
  }

  // ngOnChanges(changes: SimpleChanges) {
  //   let dateWiseCases = changes.cases.currentValue;
  //   if(dateWiseCases && dateWiseCases.length){
  //     this.topFiveStatesData = []; 
  //     this.showCityTable = [];
  //     this.setTableStatistics(dateWiseCases);
  //   }
  // }

  setTableStatistics() {
    if (this.patientsData && this.deceasedPatientData && this.recoveredPatientData) {
      //var stateWiseData = _.groupBy(this.patientsData, 'state');
      let stateWiseConfirmCases = _.groupBy(this.patientsData, 'state');
      let stateWiseRecoveredCases =  _.groupBy(this.recoveredPatientData, 'state');
      let stateWiseDeceasedCases =  _.groupBy(this.deceasedPatientData, 'state');

      let statesData: StateStatistics[] = [];
      
      for (let state in stateWiseConfirmCases) {
        let confirmCount = this.getEndDatesConfirmCounts(state, stateWiseConfirmCases);
        let confirmCasesCount = stateWiseConfirmCases[state].length;
        let recoveredCasesCount = stateWiseRecoveredCases[state] ? stateWiseRecoveredCases[state].length : 0;
        let deceasedCasesCount = stateWiseDeceasedCases[state] ? stateWiseDeceasedCases[state].length : 0;
        
        let stateData: StateStatistics = {
          name: state,
          confirmCases: confirmCasesCount,
          activeCases: confirmCasesCount - recoveredCasesCount - deceasedCasesCount,
          recoveredCases: recoveredCasesCount,
          deceasedCases: deceasedCasesCount,
          topFiveCities: this.getTopFiveCities(stateWiseConfirmCases[state],stateWiseRecoveredCases[state],stateWiseDeceasedCases[state]),
          confirmUpCount: confirmCount || 0
        };
        statesData.push(stateData);
      }
      //sort by state name
      statesData.sort((a, b) => a.name.localeCompare(b.name));
      //First sort by confirm cases in cases no confirm up count
      statesData = statesData.sort((a, b) => {
        return b.confirmCases - a.confirmCases;
      });

      this.topFiveStatesData = statesData;
    }

  }

  getTopFiveCities(confirmedCases, recoveredCases, deceasedCases){
    let cityWiseConfirmData = _.groupBy(confirmedCases, 'cityName');
    let cityWiseRecoveredData = _.groupBy(recoveredCases, 'district');
    let cityWiseDeceasedData = _.groupBy(deceasedCases, 'district');
    let topFiveCitiesData = [];

    for(let city in cityWiseConfirmData){

      let confirmCasesCount = cityWiseConfirmData[city].length;
      let recoveredCasesCount = cityWiseRecoveredData[city] ? cityWiseRecoveredData[city].length : 0;
      let deceasedCasesCount = cityWiseDeceasedData[city] ? cityWiseDeceasedData[city].length : 0;
      
      let cityData: CityStatistics = {
        name: city == "" ? "Unknown" : city,
        confirmCases: confirmCasesCount,
        activeCases: confirmCasesCount - recoveredCasesCount - deceasedCasesCount,
        recoveredCases: recoveredCasesCount,
        deceasedCases: deceasedCasesCount,
        confirmUpCount: this.getEndDatesConfirmCounts(city,cityWiseConfirmData),
        
      };
      topFiveCitiesData.push(cityData);
    }
    //topFiveCitiesData.sort((a,b) => a.confirmCases.localeCompare(b.confirmCases));
    //topFiveCitiesData.sort((a, b) => b.confirmCases - a.confirmCases);
    topFiveCitiesData.sort((a,b) => a.name.localeCompare(b.name));
    return topFiveCitiesData;
  }

  getEndDatesConfirmCounts(state,topFiveStates){
    // let lastDate = `${this.endDate.getFullYear()}-${('0' + (this.endDate.getMonth()+1)).slice(-2)}-${('0' + this.endDate.getDate()).slice(-2)}`;
    let lastDate = moment(this.endDate).format("DD-MM-YYYY");
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
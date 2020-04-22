import { Component, OnInit, Input } from '@angular/core';
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
  activeCases: number,
  recoveredUpCount: number,
  deceasedUpCount: number
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
  @Input() patientsData: any;
  @Input() stateDistrictData: any;
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
    this.setTableStatistics();
  }

  setTableStatistics() {
    if(this.patientsData.statewise && this.stateDistrictData) {
      let statesData: StateStatistics[] = [];
      let stateWisePatients = this.patientsData.statewise.filter(x => x.state.toLowerCase() !== 'total');
      
      stateWisePatients.forEach(stateCases => {
        let stateData: StateStatistics = {
          name: stateCases.state,
          confirmCases: stateCases.confirmed,
          activeCases: stateCases.active,
          recoveredCases: stateCases.recovered,
          deceasedCases: stateCases.deaths,
          topFiveCities: this.getStateCities(stateCases.state),
          confirmUpCount: stateCases.deltaconfirmed,
          recoveredUpCount: stateCases.deltarecovered,
          deceasedUpCount: stateCases.deltadeaths
        };
        statesData.push(stateData);
      });

       //sort by state name
       statesData.sort((a, b) => a.name.localeCompare(b.name));
       //First sort by confirm cases in cases no confirm up count
       statesData = statesData.sort((a, b) => {
         return b.confirmCases - a.confirmCases;
       });
 
       this.topFiveStatesData = statesData;
    }
  }

  getStateCities(stateName){
    let topFiveCitiesData = [];
    let stateDistricts = this.stateDistrictData[stateName];
    if(stateDistricts){
      for(let district in stateDistricts.districtData){
        let cityData: CityStatistics = {
          name: district,
          confirmCases: stateDistricts.districtData[district].confirmed,
          activeCases: stateDistricts.districtData[district].active,
          recoveredCases: stateDistricts.districtData[district].recovered,
          deceasedCases: stateDistricts.districtData[district].deceased,
          confirmUpCount: stateDistricts.districtData[district].delta.confirmed,
          
        };
        topFiveCitiesData.push(cityData);
      }

      topFiveCitiesData.sort((a,b) => a.name.localeCompare(b.name));
      return topFiveCitiesData;
    }
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
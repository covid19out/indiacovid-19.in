import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { PatientsDataService } from 'src/app/services/patients-data.service';

export interface CityData {
  cityName: string;
  totalIndianConfirmCases: number;
  // totalForeignConfirmCases: number;
  totalDischargedCases: number;
  totalDeathCases: number;
  totalCount: number;
  backgroundColor: string;
}


@Component({
  selector: 'app-city-wise-cards',
  templateUrl: './city-wise-cards.component.html',
  styleUrls: ['./city-wise-cards.component.scss']
})
export class CityWiseCardsComponent implements OnInit {
  patientsData: any = [];
  recoveredPatientData: any;
  deceasedPatientData: any;
  cityWiseData: CityData[] = [];
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
      let cityWiseStat: CityData[] = [];
      let cityWisePatients = _.groupBy(this.patientsData, 'cityName');

      for (let city in cityWisePatients) {
        if (city) {
          var patientData: CityData = this.getCityStats(city, cityWisePatients);
          cityWiseStat.push(patientData);
        }
      }

      //If city is unknown add records at first place
      if (cityWisePatients.hasOwnProperty("") || cityWisePatients.hasOwnProperty(undefined)) {
        cityWiseStat.unshift(this.getCityUnconfirmedRecord(cityWisePatients));
      }

      this.cityWiseData = this.getSortedData(cityWiseStat);
    }
  }

  getCityStats(city,cityWisePatients){
    let cityWiseRecoveredData = _.groupBy(this.recoveredPatientData, 'district');
    let cityWiseDeceasedData = _.groupBy(this.deceasedPatientData, 'district');
    let confirmCasesCount = cityWisePatients[city].length;
    let recoveredCasesCount = cityWiseRecoveredData[city] ? cityWiseRecoveredData[city].length : 0;
    let deceasedCasesCount = cityWiseDeceasedData[city] ? cityWiseDeceasedData[city].length : 0;
    return {
      cityName: city == "" ? "Unknown" : city,
      totalIndianConfirmCases: confirmCasesCount,
      // totalForeignConfirmCases: cityWisePatients[city].filter(x => x.nationality !== "Indian" && x.caseType == "Confirmed").length,
      totalDischargedCases: recoveredCasesCount,
      totalDeathCases: deceasedCasesCount,
      totalCount: confirmCasesCount,
      backgroundColor: this.getRandomColor()
    };
  }

  getCityUnconfirmedRecord(cityWisePatients){
    return this.getCityStats("",cityWisePatients);
  }

  getSortedData(cityWiseStat) {
    return cityWiseStat.sort((a, b) => {
      return b.totalCount - a.totalCount;
    });
  }

  getRandomColor() {
    let number = Math.floor(Math.random() * 35);
    return this.backgroundColor[number];
  }

}

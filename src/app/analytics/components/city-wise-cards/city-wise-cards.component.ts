import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { PatientsDataService } from 'src/app/services/patients-data.service';

export interface CityData {
  cityName: string;
  totalIndianConfirmCases: number;
  totalForeignConfirmCases: number;
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
  cityWiseData: CityData[] = [];
  backgroundColor = ["#86C7F3", "#FFA1B5", "#FFE29A", "#FFC7F7", "#E4FF90", "#FFB2B2", "#C5D0D2", "#B8FDE1",
    "#DCEDC1", "#E2CFD8", "#FFF8D3", "#E6E6FA", "#EFE0C6", "#D2E2E2", "#A8FFA8", "#FFFF89", "#FFC3A0",
    "#C39797", "#A3C7C5", "#E8DAD0", "#E0B9BB", "#CCD89D", "#AF9AAF", "#9E9ED6", "#AC72E2", "#A7A2A2",
    "#FFC967", "#C2C9B4", "#D0A892", "#D8F4AF"];

  constructor(private patientsDataService: PatientsDataService) { }

  ngOnInit() {
    this.patientsDataService.patientsData.subscribe(data => {
      if (data) {
        this.prepareData(data);
      }
    });
  }

  prepareData(data) {
    this.patientsData = data;
    let cityWiseStat: CityData[] = [];
    let cityWisePatients = _.groupBy(this.patientsData, 'cityName');

    for (let city in cityWisePatients) {
      if (city !== "") {
        var patientData: CityData = this.getCityStats(city,cityWisePatients);
        cityWiseStat.push(patientData);
      }
    }

    cityWiseStat.unshift(this.getCityUnconfirmedRecord(cityWisePatients));
    this.cityWiseData = this.getSortedData(cityWiseStat);
  }

  getCityStats(city,cityWisePatients){
    return {
      cityName: city == "" ? "City Not Confirmed" : city,
      totalIndianConfirmCases: cityWisePatients[city].filter(x => x.nationality == "Indian" && x.caseType == "Confirmed").length,
      totalForeignConfirmCases: cityWisePatients[city].filter(x => x.nationality !== "Indian" && x.caseType == "Confirmed").length,
      totalDischargedCases: cityWisePatients[city].filter(x => x.caseType == "Recovered/Discharged").length,
      totalDeathCases: cityWisePatients[city].filter(x => x.caseType == "Deceased").length,
      totalCount: cityWisePatients[city].length,
      backgroundColor: this.getRandomColor()
    };
  }

  getCityUnconfirmedRecord(cityWisePatients){
    return this.getCityStats("",cityWisePatients);
  }

  getSortedData(cityWiseStat) {
    return cityWiseStat.sort((a, b) => {
      return b.totalIndianConfirmCases - a.totalIndianConfirmCases;
    });
  }


  getRandomColor() {
    let number = Math.floor(Math.random() * 30);
    return this.backgroundColor[number];
  }

}

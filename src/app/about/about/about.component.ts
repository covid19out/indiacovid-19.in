import { Component, OnInit } from '@angular/core';
import { PatientsDataService } from 'src/app/services/patients-data.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor(private patientsDataService: PatientsDataService) { }

  ngOnInit() {
  }
  ngDoCheck() {
    // this.patientsDataService.titleSubject.next("India Covid-19 - Corona Virus Dashboard India (Live) - " + this.patientsDataService.covid19TotalConfirmedCases + " confirmed cases and " + this.patientsDataService.covid19TotalDeaths[0] +" deaths in India from Covid-19 Virus Outbreak");
    // this.patientsDataService.metaData.next({name:"twitter:card" , content:"India Covid-19 - Corona Virus Dashboard India (Live) - " + this.patientsDataService.covid19TotalConfirmedCases + " confirmed cases and " + this.patientsDataService.covid19TotalDeaths +" deaths in India from Covid-19 Virus Outbreak"});
    // this.patientsDataService.metaData.next({name:"og:title" , content:"India Covid-19 - Corona Virus Dashboard India (Live) - " + this.patientsDataService.covid19TotalConfirmedCases + " confirmed cases and " + this.patientsDataService.covid19TotalDeaths +" deaths in India from Covid-19 Virus Outbreak"});
    // this.patientsDataService.metaData.next({name:"og:description" , content:"Live statistics and coronavirus tracking the number of confirmed cases, recovered patients, and death toll in India due to the COVID 19 coronavirus from Wuhan, China. Coronavirus counter with new cases, historical data, and info. Daily charts, graphs, and updates"});
    // this.patientsDataService.metaData.next({name:"twitter:description" , content:"Live statistics and coronavirus tracking the number of confirmed cases, recovered patients, and death toll in India due to the COVID 19 coronavirus from Wuhan, China. Coronavirus counter with new cases, historical data, and info. Daily charts, graphs, and updates"});
    // this.patientsDataService.metaData.next({name:"og:site_name" , content:"India Covid-19 - Corona Virus Dashboard India (Live) - " + this.patientsDataService.covid19TotalConfirmedCases + " confirmed cases and " + this.patientsDataService.covid19TotalDeaths +" deaths in India from Covid-19 Virus Outbreak"});
    // this.patientsDataService.metaData.next({name:"keywords" , content:"MOHFW India,COVID-19, Data Corona Virus,Outbreak in India, India COVID-19, India, India Corona Virus, Dashboard, Aggregator, Confirmed Cases,Live, Deaths,Covid 19, Awareness, Helpline, Testing Centers, Statewise, Citywise, Analytics, Worldwide, India, News, Covid News, Contact Information, Intensive Cases, ICU, Growth Rate, Discharged, Recovered, Released, death toll, stats, statistics, Wuhan, China, Virus, New Cases, historical data, graphs, charts, updates"});   
  }

}

import { Component } from '@angular/core';
import { Router,NavigationStart,NavigationEnd, ActivatedRoute} from '@angular/router';
import { PatientsDataService } from './services/patients-data.service';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent { 
  patientsData:any;
  public totalConfirmedCases = 0;
  public totalHospitalisedCases = 0;
  public totalDischargedCases = 0;
  public totalDeathCases = 0;
  constructor(private patientsDataService:PatientsDataService,private router: Router,private activatedRoute:ActivatedRoute,private metaTag:Meta){
  }

  async getCasesData(){
    await this.patientsDataService.loadCasesData().subscribe(data => {
      this.patientsData = data;
      this.initData();
    });
  }

  initData() {
    this.setCounts();
  }
  async setCounts(){
    let totalCases = this.patientsData.statewise.find(x => x.state.toLowerCase() == 'total');
    this.totalConfirmedCases = totalCases.confirmed;
    this.totalDischargedCases = totalCases.recovered;
    this.totalDeathCases = totalCases.deaths;
    this.totalHospitalisedCases = totalCases.active;
    this.patientsDataService.metaData.next({ name: "description", content: "India Covid-19 - Coronavirus Tracker India (Live) - Dashboard - " + this.totalConfirmedCases + " confirmed, " + (this.totalConfirmedCases - this.totalDeathCases - this.totalDischargedCases) + " Active, " + this.totalDischargedCases + " Recovered and " + this.totalDeathCases + " deceased in India from Coronavirus aka Covid19 Outbreak which started from Wuhan, China. Coronavirus counter with new cases, historical data, and info. Daily charts, graphs, and updates" });
    this.patientsDataService.metaData.next({ name: "twitter:card", content: "India Covid-19 - Coronavirus Tracker India (Live) - Dashboard - " + this.totalConfirmedCases + " confirmed, " + (this.totalConfirmedCases - this.totalDeathCases - this.totalDischargedCases) + " Active, " + this.totalDischargedCases + " Recovered and " + this.totalDeathCases + " deceased in India from Coronavirus aka Covid19 Outbreak" });
    this.patientsDataService.metaData.next({ property: "og:title", content: "India Covid-19 - https://indiacovid-19.in - Coronavirus Tracker India (Live) - Dashboard - " + this.totalConfirmedCases + " confirmed, " + (this.totalConfirmedCases - this.totalDeathCases - this.totalDischargedCases) + " Active, " + this.totalDischargedCases + " Recovered and " + this.totalDeathCases + " deceased in India from Coronavirus aka Covid19 Outbreak" });
    this.patientsDataService.metaData.next({ property: "og:description", content: "India Covid-19 - Coronavirus Tracker India (Live) - Dashboard - " + this.totalConfirmedCases + " confirmed, " + (this.totalConfirmedCases - this.totalDeathCases - this.totalDischargedCases) + " Active, " + this.totalDischargedCases + " Recovered and " + this.totalDeathCases + " deceased in India from Coronavirus aka Covid19 Outbreak which started from Wuhan, China. Coronavirus counter with new cases, historical data, and info. Daily charts, graphs, and updates" });
    this.patientsDataService.metaData.next({ name: "twitter:description", content: "India Covid-19 - Coronavirus Tracker India (Live) - Dashboard - " + this.totalConfirmedCases + " confirmed, " + (this.totalConfirmedCases - this.totalDeathCases - this.totalDischargedCases) + " Active, " + this.totalDischargedCases + " Recovered and " + this.totalDeathCases + " deceased in India from Coronavirus aka Covid19 Outbreak which started from Wuhan, China. Coronavirus counter with new cases, historical data, and info. Daily charts, graphs, and updates" });
    this.patientsDataService.metaData.next({ property: "og:site_name", content: "India Covid-19 - Coronavirus Tracker India (Live) - Dashboard - " + this.totalConfirmedCases + " confirmed,  " + (this.totalConfirmedCases - this.totalDeathCases - this.totalDischargedCases) + " Active, " + this.totalDischargedCases + " Recovered and " + this.totalDeathCases + " deceased in India from Coronavirus aka Covid19 Outbreak" });
    this.patientsDataService.metaData.next({ name: "keywords", content: "MOHFW India,COVID-19, Data Corona Virus,Outbreak in India, India COVID-19, India, India Coronavirus, Dashboard, Aggregator, Confirmed Cases,Live, Deaths,Covid 19, Awareness, Helpline, Testing Centers, Statewise, Citywise, Analytics, Worldwide, India, News, Covid News, Contact Information, Intensive Cases, ICU, Growth Rate, Discharged, Recovered, Released, death toll, stats, statistics, Wuhan, China, Virus, New Cases, historical data, graphs, charts, updates, live, tracker, covid19, hourly updates" });
  }


  ngOnInit() {
    this.getCasesData();
    this.titleChanges();
  }
  // ngOnCheck(){
  //   this.titleChanges();
  // }

  async titleChanges(){
    await this.patientsDataService.titleSubject.subscribe((data:string) =>{
      if(data){
        var title=document.getElementsByTagName("title")[0];
        title.innerText=data;
      }
    });

    await this.patientsDataService.metaData.subscribe((data:any)=>{
      if(data){
      this.metaTag.updateTag(data);
      }
    });

    await this.router.events.subscribe(event => {
        if (event instanceof NavigationStart) {
          if (!!event.url && event.url.match(/^\/#/)) {
            this.router.navigate([event.url.replace('/#', '')]);
          }
        }
        if(event instanceof NavigationEnd){
          let child = this.activatedRoute.firstChild;
          while(child.firstChild){
            child = child.firstChild;
          }
          if(child.snapshot.data['title']){
            this.patientsDataService.titleSubject.next(child.snapshot.data['title']);
          }
        }
      });
  }
}

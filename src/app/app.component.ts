import { Component } from '@angular/core';
import { Router,NavigationStart} from '@angular/router';
import { PatientsDataService } from './services/patients-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  //title = 'INDIA COVID-19 - Corona Virus Updates';
  
  constructor(private PatientsDataService:PatientsDataService,private router: Router){
    this.PatientsDataService.loadPatientsData();
  }
  ngOnInit() {
      this.router.events.subscribe(event => {
        if (event instanceof NavigationStart) {
          if (!!event.url && event.url.match(/^\/#/)) {
            this.router.navigate([event.url.replace('/#', '')]);
          }
        }
      });
    }
}

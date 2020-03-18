import { Component } from '@angular/core';

import { PatientsDataService } from './services/patients-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'INDIA COVID-19 - Corona Virus Updates';
  isCollapsed:boolean = true;
  constructor(private PatientsDataService:PatientsDataService){
    this.PatientsDataService.loadPatientsData();
  }

  hideDropdown(){
    this.isCollapsed = true;
  }
}

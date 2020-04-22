import { Component, OnInit, Input } from '@angular/core';
import * as _ from 'lodash';

export interface States {
  name: string;
  confirmed: number;
  recovered: number;
  confirmedPercentage: number;
  backgroundColor: string;
  color: string;
}

@Component({
  selector: 'app-top-state-cards',
  templateUrl: './top-state-cards.component.html',
  styleUrls: ['./top-state-cards.component.scss']
})
export class TopStateCardsComponent implements OnInit {
  @Input() patientsData: any;
  topStates: any = [];
  stateColors = [
    { backgoundColor: "#FFF0F0", color: "#FF3324" },
    { backgoundColor: "#fff8e3", color: "#ffbf00" },
    { backgoundColor: "#E0F4E9", color: "#1BB65D" },
    { backgoundColor: "#F0F0F8", color: "#46467F" },
    { backgoundColor: "#FFEBFD", color: "#FF24EC" },
  ]

  constructor() { }

  ngOnInit() {
    this.setStates();
  }

  setStates() {
    if (this.patientsData.statewise) {
      let sortedStates = this.patientsData.statewise.sort((a, b) => b.confirmed - a.confirmed);
      sortedStates = sortedStates.slice(1, 6);
      for (let i = 0; i < 5; i++) {
        let state: States = {
          name: sortedStates[i].state,
          confirmed: sortedStates[i].confirmed,
          recovered: sortedStates[i].recovered,
          confirmedPercentage: this.getConfirmedPercentage(sortedStates[i].confirmed),
          backgroundColor: this.stateColors[i].backgoundColor,
          color: this.stateColors[i].color
        }
        this.topStates.push(state);
      }
    }
  }

  getConfirmedPercentage(confirmedCases) {
    let totalCases = this.patientsData.statewise.find(x => x.state.toLowerCase() == 'total');
    return Math.floor(confirmedCases * 100 / totalCases.confirmed);
  }

}

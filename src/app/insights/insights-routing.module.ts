import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { InsightsComponent } from './components/insights/insights.component';
import { CurrentCaseComponent } from './components/current-case/current-case.component';
import { DischargedCaseComponent } from './components/discharged-case/discharged-case.component';



const routes: Routes = [
  { path: '',  component: InsightsComponent },
  { path: 'currentCases',  component: CurrentCaseComponent },
  { path: 'dischargedCases',  component: DischargedCaseComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InsightsRoutingModule { }

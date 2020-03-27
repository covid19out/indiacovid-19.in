import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { CasesComponent } from './components/cases/cases.component';
import { NetworkGraphComponent } from './components/network-graph/network-graph.component';

const routes: Routes = [
  { path: '',  component: CasesComponent },
  { path: 'network-graph',  component: NetworkGraphComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CasesRoutingModule { }

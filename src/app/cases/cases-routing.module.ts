import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { CasesComponent } from './components/cases/cases.component';

const routes: Routes = [
  { path: '',  component: CasesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CasesRoutingModule { }

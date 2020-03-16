import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { helplineComponent } from './components/helpline/helpline.component';

const routes: Routes = [
  { path: '',  component: helplineComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HelplineRoutingModule { }

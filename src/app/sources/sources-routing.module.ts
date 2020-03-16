import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { SourcesComponent } from './components/sources/sources.component';

const routes: Routes = [
  { path: '',  component: SourcesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SourcesRoutingModule { }

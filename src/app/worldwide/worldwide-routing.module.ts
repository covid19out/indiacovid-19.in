import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { WorldwideComponent } from './components/worldwide/worldwide.component';

const routes: Routes = [
  { path: '',  component: WorldwideComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorldwideRoutingModule { }

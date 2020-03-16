import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo:'dashboard', pathMatch:'full' },
  { path: 'dashboard', loadChildren: './home/home.module#HomeModule'},
  { path: 'analytics', loadChildren: './analytics/analytics.module#AnalyticsModule'},
  { path: 'cases', loadChildren: './cases/cases.module#CasesModule'},
  { path: 'insight', loadChildren: './insights/insights.module#InsightsModule'},
  { path: 'map', loadChildren: './map/map.module#MapModule'},
  { path: 'worldwide', loadChildren: './worldwide/worldwide.module#WorldwideModule'}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

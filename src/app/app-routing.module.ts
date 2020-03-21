import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
//import { SelectivePreloadingStrategyService } from './selective-preloading.service';

const routes: Routes = [
  { path: '', redirectTo:'dashboard', pathMatch:'full' },
  //{ path: '', redirectTo:'', pathMatch:'full' },
  { path: 'dashboard', loadChildren: './home/home.module#HomeModule'},
  { path: 'analytics', loadChildren: './analytics/analytics.module#AnalyticsModule'},
  { path: 'cases', loadChildren: './cases/cases.module#CasesModule'},
  { path: 'insight', loadChildren: './insights/insights.module#InsightsModule'},
  { path: 'map', loadChildren: './map/map.module#MapModule'},
  { path: 'worldwide', loadChildren: './worldwide/worldwide.module#WorldwideModule'},
  { path: 'sources', loadChildren: './sources/sources.module#SourcesModule'},
  { path: 'helpline', loadChildren: './helpline/helpline.module#HelplineModule'},
  { path: 'about', loadChildren: './about/about.module#AboutModule'}
];


@NgModule({
  imports: [RouterModule.forRoot(routes,{
    scrollPositionRestoration: 'top',
    preloadingStrategy: PreloadAllModules,
  })],
  exports: [RouterModule]
  
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './home/home.module#HomeModule'},
  { path: 'dashboard', loadChildren: './home/home.module#HomeModule'},
  { path: 'worldwide', loadChildren: './worldwide/worldwide.module#WorldwideModule'},
  { path: 'sources', loadChildren: './sources/sources.module#SourcesModule'},
  { path: 'helpline', loadChildren: './helpline/helpline.module#HelplineModule'},
  { path: 'about', loadChildren: './about/about.module#AboutModule'},
  { path: 'MOHFWIndia', loadChildren: './goverment-data/goverment-data.module#GovermentDataModule'},
];


@NgModule({
  imports: [RouterModule.forRoot(routes,{
    scrollPositionRestoration: 'top',
    preloadingStrategy: PreloadAllModules,
  })],
  exports: [RouterModule]
  
})
export class AppRoutingModule { }

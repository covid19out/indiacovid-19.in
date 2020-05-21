import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule)},
  { path: 'dashboard', loadChildren: () => import('./home/home.module').then(m => m.HomeModule)},
  { path: 'worldwide', loadChildren: () => import('./worldwide/worldwide.module').then(m => m.WorldwideModule)},
  { path: 'sources', loadChildren: () => import('./sources/sources.module').then(m => m.SourcesModule)},
  { path: 'helpline', loadChildren: () => import('./helpline/helpline.module').then(m => m.HelplineModule)},
  { path: 'about', loadChildren: () => import('./about/about.module').then(m => m.AboutModule)},
  { path: 'MOHFWIndia', loadChildren: () => import('./goverment-data/goverment-data.module').then(m => m.GovermentDataModule)},
];


@NgModule({
  imports: [RouterModule.forRoot(routes,{
    scrollPositionRestoration: 'top',
    preloadingStrategy: PreloadAllModules,
  })],
  exports: [RouterModule]
  
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2TableModule } from 'ng2-table/ng2-table';


import { CasesRoutingModule } from './cases-routing.module';
import { CasesComponent } from './components/cases/cases.component';


@NgModule({
  declarations: [CasesComponent],
  imports: [
    CommonModule,
    CasesRoutingModule,
    Ng2TableModule,
    // NgTableComponent,
    // NgTableFilteringDirective,
    // NgTablePagingDirective, 
    // NgTableSortingDirective
  ]
})
export class CasesModule { }

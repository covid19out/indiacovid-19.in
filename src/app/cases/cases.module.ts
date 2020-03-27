import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2TableModule } from 'ng2-table/ng2-table';
import { PaginationModule } from 'ngx-bootstrap';
import { FormsModule } from '@angular/forms';


import { CasesRoutingModule } from './cases-routing.module';
import { CasesComponent } from './components/cases/cases.component';
import { NetworkGraphComponent } from './components/network-graph/network-graph.component';


@NgModule({
  declarations: [CasesComponent, NetworkGraphComponent],
  imports: [
    CommonModule,
    CasesRoutingModule,
    FormsModule,
    Ng2TableModule,
    PaginationModule.forRoot(),
  ]
})
export class CasesModule { }

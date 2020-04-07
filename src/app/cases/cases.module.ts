import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2TableModule } from 'ng2-table/ng2-table';
import { PaginationModule } from 'ngx-bootstrap';
import { FormsModule } from '@angular/forms';
import { PopoverModule } from 'ngx-bootstrap/popover';

import { CasesRoutingModule } from './cases-routing.module';
import { CasesComponent } from './components/cases/cases.component';


@NgModule({
  declarations: [CasesComponent],
  imports: [
    CommonModule,
    CasesRoutingModule,
    FormsModule,
    Ng2TableModule,
    PaginationModule.forRoot(),
    PopoverModule.forRoot()
  ]
})
export class CasesModule { }

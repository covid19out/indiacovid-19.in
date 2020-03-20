import { Component, OnInit } from '@angular/core';
// import { NgTableComponent, NgTableFilteringDirective, NgTablePagingDirective, NgTableSortingDirective } from 'ng2-table/ng2-table';
import { TableData } from './table-data';
import { PatientsDataService } from 'src/app/services/patients-data.service';

@Component({
  selector: 'app-cases',
  templateUrl: './cases.component.html',
  styleUrls: ['./cases.component.scss']
})
export class CasesComponent implements OnInit {
  public rows:Array<any> = [];
  public columns:Array<any> = [
    // { title: 'Case', name: 'case'},
    // { title: 'Patient', name: 'patient'},
    // { title: 'Age', className: [''], name: 'age', sort: ''},
    // { title: 'Gender', name: 'gender', sort: ''},
    // { title: 'Nationality', className: '', name: 'nationality'},
    // { title: 'Status', name: 'status'},
    // { title: 'Infection Source', name: 'infectionSource'},
    // { title: 'Symptomatic To Confirmation', name: 'symptomaticToConfirmation', sort:''},
    // { title: 'Days To Recover', name: 'daysToRecover', sort:''},
    // { title: 'Symptomatic At', name: 'symptomaticAt', sort:''},
    // { title: 'Confirmed At', name: 'confirmedAt', sort:''},
    // { title: 'Recovered At', name: 'recoveredAt', sort:''},
    // { title: 'Displayed Symptoms', name: 'displayedSymptoms', sort:''} 

//For new Data

    { title: 'Case', name: 'caseNumber'},
    // { title: 'Patient', name: 'details'},
    { title: 'Age', className: [''], name: 'age', sort: ''},
    { title: 'Gender', name: 'gender', sort: ''},
    { title: 'Nationality', className: '', name: 'nationality'},
    { title: 'State', className: '', name: 'state'},
    { title: 'City', className: '', name: 'cityName', sort:''},
    // { title: 'Status', name: 'status'},
    // { title: 'Infection Source', name: 'infectionSource'},
    { title: 'Symptomatic To Confirmation', name: 'symptomaticToConfirmation', sort:''},
    { title: 'Days To Recover', name: 'daysToRecover', sort:''},
    //{ title: 'Symptomatic At', name: 'symtomaticAt', sort:''},
    { title: 'Confirmed At', name: 'confirmAt', sort:''},
    //{ title: 'Recovered At', name: 'recoveredAt', sort:''},
    // { title: 'Displayed Symptoms', name: 'displayedSymptoms', sort:''}   
    
  ]; 
  public page:number = 1;
  public itemsPerPage:number = 10;
  public maxSize:number = 5;
  public numPages:number = 1;
  public length:number = 0;

  public config:any = {
    paging: true,
    sorting: {columns: this.columns},
    filtering: {filterString: ''},
    className: ['table-striped', 'table-bordered']
  };

  private data:Array<any>;
  constructor(private patientsDataService: PatientsDataService) {
    // this.length = this.data.length;
   }

  ngOnInit() {
    
    this.patientsDataService.patientsData.subscribe(data => {
      //For firebase Data
      if(data){
        data.forEach(patient => {
          let symptomaticDiffInTime = new Date(patient.confirmAt).getTime() - new Date(patient.symptomaticAt).getTime();
          patient.symptomaticToConfirmation = symptomaticDiffInTime / (1000 * 3600 * 24) || '-';
          let daysRecoverDiffInTime = new Date(patient.recoveredAt).getTime() - new Date(patient.confirmAt).getTime();
          patient.daysToRecover = daysRecoverDiffInTime / (1000 * 3600 * 24) || '-';
        });
        data.sort((a,b)=>b.caseNumber - a.caseNumber);
        this.data = data;   
        this.length = this.data.length;         
        this.onChangeTable(this.config);
      }

    })
  }

  
  public changePage(page:any, data:Array<any> = this.data):Array<any> {
    let start = (page.page - 1) * page.itemsPerPage;
    let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
    return data.slice(start, end);
  }

  public changeSort(data:any, config:any):any {
    if (!config.sorting) {
      return data;
    }

    let columns = this.config.sorting.columns || [];
    let columnName:string = void 0;
    let sort:string = void 0;

    for (let i = 0; i < columns.length; i++) {
      if (columns[i].sort !== '' && columns[i].sort !== false) {
        columnName = columns[i].name;
        sort = columns[i].sort;
      }
    }

    if (!columnName) {
      return data;
    }

    // simple sorting
    return data.sort((previous:any, current:any) => {
      if (previous[columnName] > current[columnName]) {
        return sort === 'desc' ? -1 : 1;
      } else if (previous[columnName] < current[columnName]) {
        return sort === 'asc' ? -1 : 1;
      }
      return 0;
    });
  }

  public changeFilter(data:any, config:any):any {
    let filteredData:Array<any> = data;
    this.columns.forEach((column:any) => {
      if (column.filtering) {
        filteredData = filteredData.filter((item:any) => {
          return item[column.name].match(column.filtering.filterString);
        });
      }
    });

    if (!config.filtering) {
      return filteredData;
    }

    if (config.filtering.columnName) {
      return filteredData.filter((item:any) =>
        item[config.filtering.columnName].match(this.config.filtering.filterString));
    }

    let tempArray:Array<any> = [];
    filteredData.forEach((item:any) => {
      let flag = false;
      this.columns.forEach((column:any) => {
        if (item[column.name].toString().match(this.config.filtering.filterString)) {
          flag = true;
        }
      });
      if (flag) {
        tempArray.push(item);
      }
    });
    filteredData = tempArray;

    return filteredData;
  }

  public onChangeTable(config:any, page:any = {page: this.page, itemsPerPage: this.itemsPerPage}):any {
    if (config.filtering) {
      Object.assign(this.config.filtering, config.filtering);
    }

    if (config.sorting) {
      Object.assign(this.config.sorting, config.sorting);
    }

    let filteredData = this.changeFilter(this.data, this.config);
    let sortedData = this.changeSort(filteredData, this.config);
    this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
    this.length = sortedData.length;
  }

  public onCellClick(data: any): any {
   // console.log(data);
  }

}

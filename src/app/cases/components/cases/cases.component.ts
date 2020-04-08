import { Component, OnInit } from '@angular/core';
import { PatientsDataService } from 'src/app/services/patients-data.service';

@Component({
  selector: 'app-cases',
  templateUrl: './cases.component.html',
  styleUrls: ['./cases.component.scss']
})
export class CasesComponent implements OnInit {
  public rows:Array<any> = [];
  public columns:Array<any> = [
    //For new Data
    { title: 'Case', name: 'caseNumber'},
    { title: 'Age', className: [''], name: 'age', sort: ''},
    { title: 'Gender', name: 'gender', sort: ''},
    { title: 'State', className: '', name: 'state'},
    { title: 'City', className: '', name: 'cityName', sort:''},
    { title: 'Confirmed At', name: 'confirmAt', sort:''},
    // { title: 'Patient', name: 'details'},   
    //{ title: 'Nationality', className: '', name: 'nationality'},
    // { title: 'Status', name: 'status'},
    // { title: 'Infection Source', name: 'infectionSource'},
    // { title: 'Symptomatic To Confirmation', name: 'symptomaticToConfirmation', sort:''},
    // { title: 'Days To Recover', name: 'daysToRecover', sort:''},
    //{ title: 'Symptomatic At', name: 'symtomaticAt', sort:''},
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

  public data:Array<any>;
  constructor(private patientsDataService: PatientsDataService) {
    // this.length = this.data.length;
   }

  ngOnInit() {
    
    this.patientsDataService.patientsData.subscribe(data => {
      //For firebase Data
      if(data){
        data.forEach(patient => {
          if(patient.status.toLowerCase() == 'recovered'){
            let recoveredAt = new Date(patient.recoveredAt);
            if(recoveredAt.getDate()){                             
              patient.daysInHospital = this.getDifferenceInDays(new Date(patient.confirmAt),recoveredAt);
            }
          } else if(patient.status.toLowerCase() == 'died'){
            let deceasedAt = new Date(patient.deceasedAt);
            if(deceasedAt.getDate()){                            
              patient.daysInHospital = this.getDifferenceInDays(new Date(patient.confirmAt),deceasedAt);               
            }
          }
        });

       data.sort((a, b) => b.caseNumber.split("P")[1] - a.caseNumber.split("P")[1]);
        this.data = data;   
        this.length = this.data.length;         
        this.onChangeTable(this.config);
      }

    })
  }

  getDifferenceInDays(startDate, endDate){
    let differenceInTime = endDate.getTime() - new Date(startDate).getTime();
    return differenceInTime / (1000 * 3600 * 24);
  }

  getGenderBackgroundColor(patient){
    let color = 'red';
    // switch(patient.status){
    //   case "HOSPITALIZED":
    //   case "Hospitalized":
    //     color = '#fff5e0';
    //     break;
    //   case "Died":
    //   case "DIED":
    //     color = '#ffcdcd';
    //     break;
    //   case "RECOVERED":
    //   case "Recovered":
    //     color = '#bfffb6';
    //     break;
    // }

    switch(patient.gender.toLowerCase()){
      case "male":
        color = '#b4d8ff';
        break;
      case "female":
        color = '#ffade3';
        break;
      default:
        color = '#f0f0f0';
        break;
    }

    return color;
  }
  
  getboxBackgroundColor(patient){
    let color = 'red';
    switch(patient.status){
      case "HOSPITALIZED":
      case "Hospitalized":
        color = '#ffdb8e';
        break;
      case "Died":
      case "DIED":
        color = '#ffa1a1';
        break;
      case "RECOVERED":
      case "Recovered":
        color = '#83f473';
        break;
    }
    return color;
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

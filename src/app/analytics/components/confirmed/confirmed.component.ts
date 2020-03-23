import { Component, OnInit } from '@angular/core';

import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { MultiDataSet, Label, Color } from 'ng2-charts';
import * as _ from 'lodash';
import { PatientsDataService } from 'src/app/services/patients-data.service';

@Component({
  selector: 'app-confirmed',
  templateUrl: './confirmed.component.html',
  styleUrls: ['./confirmed.component.scss']
})
export class ConfirmedComponent implements OnInit {
  public minDate=new Date('30 jan 2020');
  public maxDate = new Date();
  public confirmedCasesCount:number=0;
  public dischargedCasesCount:number=0;
  public growthRate:string;
  public intensiveCasesCount:number=0;
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public dates=['10 Mar', '11 Mar', '12 Mar', '13 Mar', '14 Mar', '15 Mar', '16 Mar'];
  public dataByDates=[65, 59, 80, 81, 56, 55, 40];
  public barChartLabels: Label[] = this.dates;
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];
  public barChartData: ChartDataSets[] = [
    { data: this.dataByDates, label: 'CONFIRMED CASES', stack: 'a' }
  ];
  public startDate: any=new Date("30 January 2020");
  public endDate: any=new Date();
  public patientsData: any;

  constructor(private patientsDataService : PatientsDataService) { }

  ngOnInit() {
    this.patientsDataService.patientsData.subscribe(data=>{
      this.patientsData=data;
      this.dateFilterChanged([this.startDate,this.endDate]);
    })
  }

  prepareBarChartData(patientRecords: any) {
    var dateWiseData=this.patientsDataService.filterDataByDates(patientRecords);
    this.assignDatatoBarChart(_.filter(dateWiseData , function(p){
      return p.confirmedCasesByDates != null;
    }));

    this.dischargedCasesCount=this.getCaseCountsByCaseType(dateWiseData,'dischargedByDates');
    this.intensiveCasesCount=this.getCaseCountsByCaseType(dateWiseData,'icuByDate');
    this.growthRate=this.calculateGrowthRate(dateWiseData);
  }
  calculateGrowthRate(dateWiseData: any) {
    let patientsCount=0;
    _.each(dateWiseData,(patient) => patientsCount += patient.confirmedCasesByDates || 0 );
    let startDt=new Date(this.startDate); let endDt=new Date(this.endDate);
    var count=0;
    while(startDt<=endDt){
      count++;
      startDt.setDate(startDt.getDate()+1);
    }
    if(!(count-1)) { return "Inf"; }
    return (patientsCount/ (count-1)).toFixed(2);
  }
  getCaseCountsByCaseType(dateWiseData: any, arg1: string) {
    var count : number = 0;
    _.forEach(dateWiseData,function(patient){
      count = count + (patient[arg1] || 0);
    })
    return count;
  }
  assignDatatoBarChart(dateWiseData: any) {
      let dates=[];
      let confirmedCasesByDates=[];
      _.forEach(dateWiseData,function(data){
        let confirmdeDate=new Date(data.confirmAt);
        let months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
        dates.push(confirmdeDate.getDate() + " " + months[confirmdeDate.getMonth()] );
        confirmedCasesByDates.push(data['confirmedCasesByDates'] || 0);
      });
      this.barChartLabels=dates;
      this.barChartData = [
          { data: confirmedCasesByDates, label: 'CONFIRMED CASES', stack: 'a' },
        ];
  }

  dateFilterChanged(event){
    event[0].setHours(0,0,0,0);
    event[1].setHours(23,59,59,999);
    this.startDate = event[0];
    this.endDate = event[1];
    var filteredData = _.filter(this.patientsData,function(patient){
      let patientsDate = new Date(patient.confirmAt);
      if(patientsDate >= event[0]   && patientsDate <= event[1]){
        return patient;
      }
    });
    this.confirmedCasesCount=filteredData.length;
    this.prepareBarChartData(filteredData);
  }
}

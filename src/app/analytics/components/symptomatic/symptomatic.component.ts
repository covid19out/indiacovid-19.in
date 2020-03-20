import { Component, OnInit } from '@angular/core';

import { MultiDataSet, Label, Color } from 'ng2-charts';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as _ from 'lodash';
import { PatientsDataService } from 'src/app/services/patients-data.service';

@Component({
  selector: 'app-symptomatic',
  templateUrl: './symptomatic.component.html',
  styleUrls: ['./symptomatic.component.scss']
})
export class SymptomaticComponent implements OnInit {
  public minDate=new Date('jan 2020');
  public maxDate = new Date();
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public dates=['10 Mar', '11 Mar', '12 Mar', '13 Mar', '14 Mar', '15 Mar', '16 Mar'];
  public dataByDates=[0, 0, 0, 0, 1, 2, 2];
  public barChartLabels: Label[] = this.dates;
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];
  public barChartData: ChartDataSets[] = [
    { data: this.dataByDates, label: 'DISCHARGED / RECOVERED CASES', stack: 'a' }
  ];
  public startDate: any=new Date("21 January 2020");
  public endDate: any=new Date();
  patientsData: any;
  
  constructor(private patientsDataService : PatientsDataService) { }

  ngOnInit() {
    this.patientsDataService.patientsData.subscribe(data=>{
      this.patientsData=data;
      this.dateFilterChanged([this.startDate,this.endDate]);
    })
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
    this.prepareBarChartData(filteredData);
  }

  prepareBarChartData(patientRecords: any) {
    var dateWiseData=this.patientsDataService.filterDataByDates(patientRecords);
    this.assignDatatoBarChart(_.filter(dateWiseData , function(p){
      return p.reportedSympoMaticByDates != null;
    }));
  }

  assignDatatoBarChart(dateWiseData: any) {
    let dates=[];
    let reportedSympoMaticByDates=[];
    _.forEach(dateWiseData,function(data){
      dates.push(data.confirmAt.slice(0,-5));
      reportedSympoMaticByDates.push(data['reportedSympoMaticByDates'] || 0);
    });
    this.barChartLabels=dates;
    this.barChartData = [
        { data: reportedSympoMaticByDates, label: 'REPORTED SYMPTOMATIC', stack: 'a' },
      ];
}

}

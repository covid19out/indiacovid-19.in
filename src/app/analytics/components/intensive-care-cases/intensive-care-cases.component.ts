import { Component, OnInit } from '@angular/core';

import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { MultiDataSet, Label, Color } from 'ng2-charts';
import * as _ from 'lodash';
import { PatientsDataService } from 'src/app/services/patients-data.service';

@Component({
  selector: 'app-intensive-care-cases',
  templateUrl: './intensive-care-cases.component.html',
  styleUrls: ['./intensive-care-cases.component.scss']
})
export class IntensiveCareCasesComponent implements OnInit {
  public minDate=new Date('jan 2020');
  public lineChartLegend = false;
  public lineChartType = 'line';
  public lineChartPlugins = [];
  //Gender over Time line chart


  public lineChartData: ChartDataSets[] = [
    { data: [], label: 'Male' }
  ];
  public lineChartLabels: Label[] = [];
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    annotation: false
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'blue',
      backgroundColor: 'rgba(0,0,0,0)',
    },
  ];
  public startDate: any=new Date("21 January 2020");
  public endDate: any=new Date();
   patientsData: any;
  totalIcuCases: any;

  constructor(private patientsDataService : PatientsDataService) { }

  ngOnInit() {
    this.patientsDataService.patientsData.subscribe(data => {
      this.patientsData = data;
      this.dateFilterChanged([this.startDate, this.endDate]);
    });
  }
  dateFilterChanged(event){
    event[0].setHours(0,0,0,0);
    event[1].setHours(23,59,59,999);
    this.startDate = event[0].toLocaleDateString("en-US" , Option);
    this.endDate = event[1].toLocaleDateString("en-US", Option);
    var filteredData = _.filter(this.patientsData,function(patient){
      let patientsDate = new Date(patient.confirmAt);
      if(patientsDate >= event[0]   && patientsDate <= event[1]){
        return patient;
      }
    });
    this.prepareLineChartData(filteredData);
  }
  prepareLineChartData(patientRecords: any) {
    var dateWiseData=this.patientsDataService.filterDataByDates(patientRecords);
    this.assignDatatoLineChart(_.filter(dateWiseData , function(p){
      return p.icuByDate != null;
    }));
  }

  assignDatatoLineChart(dateWiseData: any) {
    let self = this;
    if (dateWiseData.length) {
      self.lineChartLabels=[];
      self.lineChartData[0].data=[]
      _.forEach(dateWiseData, function (value, key) {
        if (value.confirmedCasesByDates || value.reportedSympoMaticByDates) {
          console.log(value);
          self.lineChartLabels.push(value.confirmAt);
          self.lineChartData[0].data.push(value.icuByDate);
          self.totalIcuCases += (value.icuByDate || 0);
        }
      });
    } else {
      self.lineChartLabels = [];
      self.lineChartData[0].data = [];
    }
  }

}

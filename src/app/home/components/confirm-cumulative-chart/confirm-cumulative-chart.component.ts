import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import * as _ from 'lodash';
import * as moment from 'moment';

@Component({
  selector: 'app-confirm-cumulative-chart',
  templateUrl: './confirm-cumulative-chart.component.html',
  styleUrls: ['./confirm-cumulative-chart.component.scss']
})
export class ConfirmCumulativeChartComponent implements OnInit {
  @Input() cases: any;
  @Input() endDate: any;
  
  endDateConfirmCount: number;
  totalConfirmedCases: number;
  cumulativeChartConfirmData: ChartDataSets[];
  cumulativeChartConfirmLabels: Label[] = [];
  cumulativeChartConfirmOptions: (ChartOptions & { annotation: any });
  cumulativeChartConfirmColors: Color[];
  isInitialized:boolean = false;

  constructor() { }

  ngOnInit() {
    if(this.isInitialized) return;
    this.initChart();
    this.isInitialized = true;
  }

  ngOnChanges(changes: SimpleChanges) {
    let dateWiseCases = changes.cases.currentValue;
    if (dateWiseCases && dateWiseCases.length) {
      if(!this.isInitialized){
        this.initChart();
        this.isInitialized = true;
      }
      this.totalConfirmedCases = dateWiseCases.length;
      this.assignChartData(dateWiseCases);
      this.setEndDateConfirmCount(dateWiseCases);
    }
  }

  initChart() {
    this.cumulativeChartConfirmData = [
      { data: [], label: 'CONFIRMED CASES', lineTension: 0, pointBackgroundColor: 'rgba(0, 0, 0, 0)', pointBorderColor: 'rgba(0, 0, 0, 0)' }
    ];
    this.cumulativeChartConfirmOptions = {
      responsive: true,
      annotation: true,
      scales: {
        xAxes: [{
          gridLines: {
            color: "rgba(0, 0, 0, 0)",
          },
          ticks: {
            fontSize: 11
          }
        }],
        yAxes: [{
          gridLines: {
            color: "rgba(0, 0, 0, 0)",
          },
          ticks: {
            fontSize: 11
          }
        }]
      }
    };
    this.cumulativeChartConfirmColors = [{
      borderColor: '#fd1717',
      backgroundColor: 'rgba(253,23,23,0.2)',
      pointBackgroundColor: '#FF0000',
      pointBorderColor: '#fff',
    }];
  }

  assignChartData(filteredData) {

    this.cumulativeChartConfirmLabels = [];
    this.cumulativeChartConfirmData[0].data = [];
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
    let dateWiseConfirm = _.groupBy(filteredData, 'confirmAt');
    let count = 0;

    for (let confirmdate in dateWiseConfirm) {
      count += dateWiseConfirm[confirmdate].length;
      // let label = `${new Date(confirmdate).getDate()} ${months[new Date(confirmdate).getMonth()]} ${new Date(confirmdate).getFullYear()}`;
      let label = moment(confirmdate, "DD/MM/YYYY").format("DD MMM YYYY");
      this.cumulativeChartConfirmLabels.push(label);
      this.cumulativeChartConfirmData[0].data.push(count);
    }
    this.setEndDateConfirmCount(filteredData);
  }

  setEndDateConfirmCount(filteredData) {
    let lastDate = `${this.endDate.getFullYear()}-${('0' + (this.endDate.getMonth() + 1)).slice(-2)}-${('0' + this.endDate.getDate()).slice(-2)}`;
    this.endDateConfirmCount = filteredData.filter(x => x.confirmAt == lastDate).length;
  }

}

import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import * as _ from 'lodash';

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

  constructor() { }

  ngOnInit() {
    this.initChart();
  }

  ngOnChanges(changes: SimpleChanges) {
    let dateWiseCases = changes.cases.currentValue;
    if (dateWiseCases && dateWiseCases.length) {
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
          }
        }],
        yAxes: [{
          gridLines: {
            color: "rgba(0, 0, 0, 0)",
          }
        }]
      }
    };
    this.cumulativeChartConfirmColors = [{
      borderColor: '#ffa1b5',
      backgroundColor: 'rgba(0,0,0,0)',
      pointBackgroundColor: '#FF0000',
      pointBorderColor: '#fff',
    }];
  }

  assignChartData(filteredData) {
    let dateWiseData = filteredData.sort((a, b) => {
      return new Date(a.confirmAt).getTime() - new Date(b.confirmAt).getTime();
    });

    this.cumulativeChartConfirmLabels = [];
    this.cumulativeChartConfirmData[0].data = [];
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
    let dateWiseConfirm = _.groupBy(dateWiseData, 'confirmAt');
    let count = 0;

    for (let confirmdate in dateWiseConfirm) {
      count += dateWiseConfirm[confirmdate].length;
      let label = `${new Date(confirmdate).getDate()} ${months[new Date(confirmdate).getMonth()]} ${new Date(confirmdate).getFullYear()}`;
      this.cumulativeChartConfirmLabels.push(label);
      this.cumulativeChartConfirmData[0].data.push(count);
    }
  }

  setEndDateConfirmCount(filteredData) {
    let lastDate = `${this.endDate.getFullYear()}-${('0' + (this.endDate.getMonth() + 1)).slice(-2)}-${('0' + this.endDate.getDate()).slice(-2)}`;
    this.endDateConfirmCount = filteredData.filter(x => x.confirmAt == lastDate).length;
  }

}

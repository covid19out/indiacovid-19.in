import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { MultiDataSet, Label, Color } from 'ng2-charts';
import * as _ from 'lodash';

@Component({
  selector: 'app-test-conducted-cumulative-chart',
  templateUrl: './test-conducted-cumulative-chart.component.html',
  styleUrls: ['./test-conducted-cumulative-chart.component.scss']
})
export class TestConductedCumulativeChartComponent implements OnInit {
  @Input() filteredTestConductedData: any;
  
  cumulativeChartTestData: ChartDataSets[];
  cumulativeChartTestLabels: Label[] = [];
  cumulativeChartTestOptions: (ChartOptions & { annotation: any });
  cumulativeChartTestColors: Color[];
  isInitialized:boolean = false;

  constructor() { }

  ngOnInit() {
    if(this.isInitialized) return;
    this.initChart();
    this.isInitialized = true;
  }

  ngOnChanges(changes: SimpleChanges) {
    let testData = changes.filteredTestConductedData.currentValue;
    if (testData && testData.length) {
      if(!this.isInitialized){
        this.initChart();
        this.isInitialized = true;
      }
      this.assignChartData(testData);
    }
  }

  initChart() {
    this.cumulativeChartTestData = [
      { data: [], label: 'TESTS CONDUCTED', lineTension: 0, pointBackgroundColor: 'rgba(0, 0, 0, 0)', pointBorderColor: 'rgba(0, 0, 0, 0)' },
      { data: [], label: 'POSITIVE TESTS', lineTension: 0, pointBackgroundColor: 'rgba(0, 0, 0, 0)', pointBorderColor: 'rgba(0, 0, 0, 0)' },      
    ];

    this.cumulativeChartTestOptions = {
      responsive: true,
      annotation: true,
      scales: {
        xAxes: [{
          display: false,
          gridLines: {
            color: "rgba(0, 0, 0, 0)",
          }
        }],
        yAxes: [{
          display: false,
          gridLines: {
            color: "rgba(0, 0, 0, 0)",
          }
        }]
      }
    };
    this.cumulativeChartTestColors = [
    {
      borderColor: '#46467F',
      backgroundColor: 'rgba(0,0,0,0)',
      pointBackgroundColor: '#46467F',
      pointBorderColor: '#fff',
    },
    {
      borderColor: '#FF3324',
      backgroundColor: 'rgba(0,0,0,0)',
      pointBackgroundColor: '#FF3324',
      pointBorderColor: '#fff',
    }];
  }

  assignChartData(testsData) {
    

    this.cumulativeChartTestLabels = [];
    this.cumulativeChartTestData[0].data = [];
    this.cumulativeChartTestData[1].data = [];
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
    let dateWiseTests = _.groupBy(testsData, 'ConductedOn');

    for (let testDate in dateWiseTests) {
      let label = `${new Date(testDate).getDate()} ${months[new Date(testDate).getMonth()]} ${new Date(testDate).getFullYear()}`;
      this.cumulativeChartTestLabels.push(label);
      let testcount = 0, positiveCount = 0;

      dateWiseTests[testDate].forEach(test => {
        if(test.IndividualTestCount > testcount){
          testcount = test.IndividualTestCount;
        }
        if(test.PositiveCount){
          positiveCount = test.PositiveCount;
        }        
      });

      this.cumulativeChartTestData[0].data.push(testcount);
      this.cumulativeChartTestData[1].data.push(positiveCount);
    }
  }

}

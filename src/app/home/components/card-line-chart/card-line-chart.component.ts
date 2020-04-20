import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-card-line-chart',
  templateUrl: './card-line-chart.component.html',
  styleUrls: ['./card-line-chart.component.scss']
})
export class CardLineChartComponent implements OnInit {
    //Confirmed card Line chart
    public lineChartConfirmedData: ChartDataSets[] = [
      { data: [10,20,80,50,25,10,20,80,50,25], label: 'CONFIRMED CASES', pointBackgroundColor: 'rgba(0, 0, 0, 0)', pointBorderColor: 'rgba(0, 0, 0, 0)' }
    ];
    public lineChartConfirmedSourceLabels: Label[] = ['1','1.5','1','1','1','1','5','1','1','1'];
    public lineChartConfirmedSourceColors: Color[] = [
      {
        borderColor: '#FF3324',
        backgroundColor: 'rgba(253,23,23,0)',
      }
    ];
    public cardLineChartOptions: (ChartOptions) = {
      tooltips: { enabled: false },
      responsive: true,
      scales: {
        xAxes: [{
          display: false
        }],
        yAxes: [{
          display: false
        }]
      }
    };
    
  constructor() { }

  ngOnInit() {
  }

}

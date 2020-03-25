import { Component, OnInit, ViewChild, setTestabilityGetter } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { MultiDataSet, Label, Color } from 'ng2-charts';
import * as _ from 'lodash';
import { PatientsDataService } from 'src/app/services/patients-data.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public minDate = new Date('30 jan 2020');
  public maxDate = new Date();
  public totalCases = 0;
  public totalConfirmedCases = 0;
  public totalHospitalisedCases = 0;
  public totalIntesiveCases = 0;
  public totalDischargedCases = 0;
  public totalDeathCases = 0;
  public maleCount = 0;
  public femaleCount = 0;
  public totalImportedTransmission = 0;
  public totalLocalTransmission = 0;
  public totalFemaleCases = 0;
  public totalMaleCases = 0;
  public chartColors = [
    {
      backgroundColor: ["#86C7F3", "#FFA1B5", "#FFE29A", "#FFC7F7", "#E4FF90", "#FFB2B2", "#C5D0D2", "#B8FDE1",
        "#DCEDC1", "#E2CFD8", "#FFF8D3", "#E6E6FA", "#EFE0C6", "#D2E2E2", "#A8FFA8", "#FFFF89", "#FFC3A0",
        "#C39797", "#A3C7C5", "#E8DAD0", "#E0B9BB", "#CCD89D", "#AF9AAF", "#9E9ED6", "#AC72E2", "#A7A2A2",
        "#FFC967", "#C2C9B4", "#D0A892", "#D8F4AF"]
    }
  ];

  bsRangeValue: Date[];
  public startDate: any = new Date("30 January 2020");
  public endDate: any = new Date();

  //stacked chart
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];
  public barChartData: ChartDataSets[] = [
    { data: [], label: 'REPORTED SYMPTOMATIC', stack: 'a' },
    { data: [], label: 'CONFIRMED CASES', stack: 'a' },
    { data: [], label: ' DISCHARGED', stack: 'a' }
  ];

  //Statewise Bar chart
  public stateBarChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      labels: {
        anchor: 'end',
        align: 'end',
      }
    }

  };

  public stateBarChartLabels: Label[] = [];
  public stateBarChartLegend = true;
  public stateBarChartPlugins = [];
  public stateBarChartData: ChartDataSets[] = [
    { data: [], label: 'State', stack: 'a' }
  ];


  // Doughnut charts
  public doughnutChartType: ChartType = 'doughnut';

  //Doughnut Gender
  public doughnutChartLabels: Label[] = [];
  public doughnutChartData: MultiDataSet = [
    []
  ];
  public pieChartGenderOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'bottom',
    },
    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {
          let tooltipLabel = data.datasets[tooltipItem.datasetIndex].label || ''
          let tooltipValue = parseInt(data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index].toString());
          let total = 0;
          tooltipLabel = data.labels[tooltipItem.index].toString();
          data.datasets[tooltipItem.datasetIndex].data.forEach(function (dataValue) {
            total += dataValue;
          });
          tooltipValue = tooltipValue >= 0 ? tooltipValue : 0;
          let percentageValue = ((tooltipValue * 100) / total).toFixed(0);
          if (tooltipLabel) {
            tooltipLabel += ': ' + percentageValue;
          }
          return tooltipLabel + "%";
        }
      }
    }
  };
  public pieChartGenderColors = [
    {
      backgroundColor: [
        '#ffa1b5',
        '#86c7f3'
      ]
    }
  ];

  //Doughnut Nationality
  public doughnutNationalityChartLabels: Label[] = ['Singaporean', 'Chinese', 'Filipino', 'Indonesian', 'Bangladeshi', 'Malaysian', 'Others'];
  public doughnutNationalityChartData: MultiDataSet = [
    [167, 19, 9, 8, 5, 5, 11]
  ];
  public pieChartNationalityOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'bottom'
    }
  };

  //Doughnut Source  
  public doughnutSourceChartLabels: Label[] = [];
  public doughnutSourceChartData: MultiDataSet = [
    []
  ];

  public pieChartSourceOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'bottom'
    }
  };

  public doughnutSourceChartColors = [
    {
      backgroundColor: [
        '#ffa1b5',
        '#86c7f3',        
      ]
    }
  ];

  //Line charts
  public lineChartLegend = false;
  public lineChartType = 'line';
  public lineChartPlugins = [];
  //Gender over Time line chart
  public lineChartData: ChartDataSets[] = [
    { data: [10, 12, 10, 8, 15, 18, 14, 17, 21, 23], label: 'Male', lineTension: 0, pointBackgroundColor: 'rgba(0, 0, 0, 0)', pointBorderColor: 'rgba(0, 0, 0, 0)' },
    { data: [7, 8, 9, 6, 10, 14, 12, 14, 19, 20], label: 'Female', lineTension: 0, pointBackgroundColor: 'rgba(0, 0, 0, 0)', pointBorderColor: 'rgba(0, 0, 0, 0)' },
  ];
  public months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  public lineChartLabels: Label[] = this.months;
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    annotation: false,
    scales: {
      xAxes: [
        {
          display: false
        }
      ],
      yAxes: [
        {
          display: false
        }
      ]
    }

  };
  public lineChartColors: Color[] = [
    {
      borderColor: '#86c7f3',
      backgroundColor: 'rgba(134,199,243,0.3)',
    },
    {
      borderColor: '#ffa1b5',
      backgroundColor: 'rgba(255,161,181,0.3)',
    }
  ];


  //Infection Source over Time
  public lineChartInfectionSourceData: ChartDataSets[] = [
    { data: [10, 12, 10, 8, 15, 18, 14, 17, 21, 23], label: 'IMPORTED CASE', lineTension: 0, pointBackgroundColor: 'rgba(0, 0, 0, 0)', pointBorderColor: 'rgba(0, 0, 0, 0)' },
    { data: [0, 0, 0, 6, 10, 20, 17, 22, 35, 40], label: 'LOCAL TRANSMISSION', lineTension: 0, pointBackgroundColor: 'rgba(0, 0, 0, 0)', pointBorderColor: 'rgba(0, 0, 0, 0)' },
  ];
  public lineChartInfectionSourceLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartInfectionSourceOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    annotation: false,
    scales: {
      xAxes: [
        {
          display: false
        }
      ],
      yAxes: [
        {
          display: false
        }
      ]
    }
  };
  public lineChartInfectionSourceColors: Color[] = [
    {
      borderColor: '#ffa1b5',
      backgroundColor: 'rgba(255,161,181,0.3)',
    },
    {
      borderColor: '#86c7f3',
      backgroundColor: 'rgba(134,199,243,0.3)',
    },    
  ];

  //Cumulate confirm cases line chart
  //
  public cumulativeChartConfirmData: ChartDataSets[] = [
    { data: [], label: 'CONFIRMED CASES', lineTension: 0, pointBackgroundColor: 'rgba(0, 0, 0, 0)', pointBorderColor: 'rgba(0, 0, 0, 0)' }
  ];
  public cumulativeChartConfirmLabels: Label[] = [];
  public cumulativeChartConfirmOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    annotation: true,
    scales: {
      xAxes: [
        {
          display: true
        }
      ],
      yAxes: [
        {
          display: true
        }
      ]
    }
  };
  public cumulativeChartConfirmColors: Color[] = [
    {
      borderColor: '#ffa1b5',
      backgroundColor: 'rgba(0,0,0,0)',
      pointBackgroundColor: '#FF0000',
      pointBorderColor: '#fff',
    }
  ];
  //Confirmed card Line chart
  public lineChartConfirmedData: ChartDataSets[] = [
    { data: [], label: 'CONFIRMED CASES', lineTension: 0, pointBackgroundColor: 'rgba(0, 0, 0, 0)', pointBorderColor: 'rgba(0, 0, 0, 0)' }
  ];
  public lineChartConfirmedSourceLabels: Label[] = [];
  public lineChartConfirmedSourceOptions: (ChartOptions & { annotation: any }) = {
    tooltips: { enabled: false },
    responsive: true,
    annotation: false,
    scales: {
      xAxes: [
        {
          display: false
        }
      ],
      yAxes: [
        {
          display: false
        }
      ]
    }
  };
  public lineChartConfirmedSourceColors: Color[] = [
    {
      borderColor: '#6e7f90',
      backgroundColor: 'rgba(110,127,144,0.2)',
    }
  ];

  //Hospitalized card line chart
  public lineChartSymptomaticData: ChartDataSets[] = [
    { data: [], label: 'Hospitalised CASES', lineTension: 0, pointBackgroundColor: 'rgba(0, 0, 0, 0)', pointBorderColor: 'rgba(0, 0, 0, 0)' }
  ];
  public lineChartSymptomaticSourceLabels: Label[] = [];
  public lineChartSymptomaticSourceOptions: (ChartOptions & { annotation: any }) = {
    tooltips: { enabled: false },
    responsive: true,
    annotation: false,
    scales: {
      xAxes: [
        {
          display: false
        }
      ],
      yAxes: [
        {
          display: false
        }
      ]
    }
  };
  public lineChartSymptomaticSourceColors: Color[] = [
    {
      borderColor: '#6e7f90',
      backgroundColor: 'rgba(110,127,144,0.3)',
    }
  ];

  //Intensive card line chart
  public lineChartIntensiveData: ChartDataSets[] = [
    { data: [], label: 'INTENSIVE CASES', lineTension: 0, pointBackgroundColor: 'rgba(0, 0, 0, 0)', pointBorderColor: 'rgba(0, 0, 0, 0)' }
  ];
  public lineChartIntensiveSourceLabels: Label[] = [];
  public lineChartIntensiveSourceOptions: (ChartOptions & { annotation: any }) = {
    tooltips: { enabled: false },
    responsive: true,
    annotation: false,
    scales: {
      xAxes: [
        {
          display: false
        }
      ],
      yAxes: [
        {
          display: false
        }
      ]
    }
  };
  public lineChartIntensiveSourceColors: Color[] = [
    {
      borderColor: '#6e7f90',
      backgroundColor: 'rgba(110,127,144,0.3)',
    }
  ];

  //Death card line chart 
  public lineChartDeathData: ChartDataSets[] = [
    { data: [], label: 'DEATH CASES', lineTension: 0, pointBackgroundColor: 'rgba(0, 0, 0, 0)', pointBorderColor: 'rgba(0, 0, 0, 0)' }
  ];
  public lineChartDeathLabels: Label[] = [];
  public lineChartDeathOptions: (ChartOptions & { annotation: any }) = {
    tooltips: { enabled: false },
    responsive: true,
    annotation: false,
    scales: {
      xAxes: [
        {
          display: false
        }
      ],
      yAxes: [
        {
          display: false
        }
      ]
    }
  };
  public lineChartDeathColors: Color[] = [
    {
      borderColor: '#6e7f90',
      backgroundColor: 'rgba(110,127,144,0.3)',
    }
  ];

  //Discharge card line chart
  public lineChartDischargeData: ChartDataSets[] = [
    { data: [], label: 'DISCHARGED CASES', lineTension: 0, pointBackgroundColor: 'rgba(0, 0, 0, 0)', pointBorderColor: 'rgba(0, 0, 0, 0)' }
  ];
  public lineChartDischargeSourceLabels: Label[] = [];
  public lineChartDischargeSourceOptions: (ChartOptions & { annotation: any }) = {
    tooltips: { enabled: false },
    responsive: true,
    annotation: false,
    scales: {
      xAxes: [
        {
          display: false
        }
      ],
      yAxes: [
        {
          display: false
        }
      ]
    }
  };
  public lineChartDischargeSourceColors: Color[] = [
    {
      borderColor: '#6e7f90',
      backgroundColor: 'rgba(110,127,144,0.3)',
    }
  ];



  public patientsData: any;

  constructor(private patientsDataService: PatientsDataService) { }

  ngOnInit() {
    this.bsRangeValue = [this.startDate, this.endDate];

    this.patientsDataService.patientsData.subscribe(data => {
      if (data) {
        this.patientsData = data;
        this.dateFilterChanged([this.startDate, this.endDate]);
      }
    });

  }

  ngDoCheck() {
    this.patientsDataService.titleSubject.next("India Covid-19 - Corona Virus Dashboard India (Live) - " + this.totalConfirmedCases + " confirmed cases and " + this.totalDeathCases +" deaths in India from Covid-19 Virus Outbreak");
    this.patientsDataService.metaData.next({name:"twitter:card" , content:"India Covid-19 - Corona Virus Dashboard India (Live) - " + this.totalConfirmedCases + " confirmed cases and " + this.totalDeathCases +" deaths in India from Covid-19 Virus Outbreak"});
    this.patientsDataService.metaData.next({name:"og:title" , content:"India Covid-19 - Corona Virus Dashboard India (Live) - " + this.totalConfirmedCases + " confirmed cases and " + this.totalDeathCases +" deaths in India from Covid-19 Virus Outbreak"});
    this.patientsDataService.metaData.next({name:"og:description" , content:"Live statistics and coronavirus tracking the number of confirmed cases, recovered patients, and death toll in India due to the COVID 19 coronavirus from Wuhan, China. Coronavirus counter with new cases, historical data, and info. Daily charts, graphs, and updates"});
    this.patientsDataService.metaData.next({name:"twitter:description" , content:"Live statistics and coronavirus tracking the number of confirmed cases, recovered patients, and death toll in India due to the COVID 19 coronavirus from Wuhan, China. Coronavirus counter with new cases, historical data, and info. Daily charts, graphs, and updates"});
    this.patientsDataService.metaData.next({name:"og:site_name" , content:"India Covid-19 - Corona Virus Dashboard India (Live) - " + this.totalConfirmedCases + " confirmed cases and " + this.totalDeathCases +" deaths in India from Covid-19 Virus Outbreak"});
    this.patientsDataService.metaData.next({name:"keywords" , content:"MOHFW India,COVID-19, Data Corona Virus,Outbreak in India, India COVID-19, India, India Corona Virus, Dashboard, Aggregator, Confirmed Cases,Live, Deaths,Covid 19, Awareness, Helpline, Testing Centers, Statewise, Citywise, Analytics, Worldwide, India, News, Covid News, Contact Information, Intensive Cases, ICU, Growth Rate, Discharged, Recovered, Released, death toll, stats, statistics, Wuhan, China, Virus, New Cases, historical data, graphs, charts, updates"});
    // this.patientsDataService.covid19TotalConfirmedCases.next({'totalCases':this.totalConfirmedCases});
    // this.patientsDataService.covid19TotalDeaths.next({'totalDeaths':this.totalDeathCases});
    // console.log(this.patientsDataService.covid19TotalDeaths);
  }

  prepareBarChartData(patientRecords: any) {
    var dateWiseData = this.patientsDataService.filterDataByDates(patientRecords);
    this.assignDatatoBarChart(patientRecords);
    this.assigndoughnutChartData(patientRecords);
    this.assigndoughnutSourceChartData(patientRecords);
    this.assignLineChartData(patientRecords);
    this.assignConfimedLineChartData(dateWiseData);
    this.assignHospitalisedLineChartData(dateWiseData);
    this.assignDischargedLineChartData(dateWiseData);
    this.assignIntensiveLineChartData(dateWiseData);
  }

  assignLineChartData(dateWiseData: any[]) {
    let chartLabels = [];
    let chartDataOfMales = [];
    let chartDataOfFemales = [];
    let chartDataOfImported = [];
    let chartDataOfLocal = [];
    if (dateWiseData.length == 1) {
      dateWiseData = _.concat({ "confirmAt": new Date(new Date().setDate(new Date(dateWiseData[0].confirmAt).getDate() - 1)) }, dateWiseData);
    }
    _.forEach(_.groupBy(dateWiseData, 'confirmAt'), function (value, key) {
      chartLabels.push(key);
      let genderWiseData = _.groupBy(value, 'gender');
      chartDataOfMales.push(genderWiseData.Male ? genderWiseData.Male.length : 0);
      chartDataOfFemales.push(genderWiseData.Female ? genderWiseData.Female.length : 0);
      let transmissionSourceWiseData = _.groupBy(value, 'source');
      chartDataOfImported.push(transmissionSourceWiseData["Imported Cases"] ? transmissionSourceWiseData["Imported Cases"].length : 0);
      chartDataOfLocal.push(transmissionSourceWiseData["Local Transmission"] ? transmissionSourceWiseData["Local Transmission"].length : 0);
    });

    chartDataOfImported.map(x => this.totalImportedTransmission += x);
    chartDataOfLocal.map(x => this.totalLocalTransmission += x);
    chartDataOfMales.map(x => this.totalMaleCases += x);
    chartDataOfFemales.map(x => this.totalFemaleCases += x);

    this.lineChartLabels = this.lineChartInfectionSourceLabels = chartLabels;
    this.lineChartData = [
      { data: chartDataOfMales, label: 'Male', lineTension: 0, pointBackgroundColor: 'rgba(0, 0, 0, 0)', pointBorderColor: 'rgba(0, 0, 0, 0)' },
      { data: chartDataOfFemales, label: 'Female', lineTension: 0, pointBackgroundColor: 'rgba(0, 0, 0, 0)', pointBorderColor: 'rgba(0, 0, 0, 0)' },
    ];
    this.lineChartInfectionSourceData = [
      { data: chartDataOfImported, label: 'IMPORTED CASE', lineTension: 0, pointBackgroundColor: 'rgba(0, 0, 0, 0)', pointBorderColor: 'rgba(0, 0, 0, 0)' },
      { data: chartDataOfLocal, label: 'LOCAL TRANSMISSION', lineTension: 0, pointBackgroundColor: 'rgba(0, 0, 0, 0)', pointBorderColor: 'rgba(0, 0, 0, 0)' },
    ];
  }

  assignCumulativeConfirmChartData(filteredData) {
    let dateWiseData = filteredData.sort((a, b) => {
      let dateA = new Date(a.confirmAt);
      let dateB = new Date(b.confirmAt);
      return dateA.getTime() - dateB.getTime();
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

  getDataCount(data: any): any {
    return data.length;
  }

  assigndoughnutNationalityChartData(patientRecords: any[]) {
    let NationalityChartLabels = [];
    let NationalityChartData = [];
    var data = _.groupBy(patientRecords, 'nationality');
    _.forEach(data, function (value, key) {
      NationalityChartLabels.push(key);
      NationalityChartData.push(value.length);
    });
    this.doughnutNationalityChartLabels = NationalityChartLabels;
    this.doughnutNationalityChartData = [NationalityChartData];
  }

  getNationalityChartLabelColor(i){
    return this.chartColors[0].backgroundColor[i];
  }

  assigndoughnutSourceChartData(dateWiseData: any[]) {
    var self = this;
    this.doughnutSourceChartLabels = [];
    this.doughnutSourceChartData = [[]];
    let groupBySource = _.groupBy(dateWiseData, 'source');
    for (let source in groupBySource) {
      this.doughnutSourceChartLabels.push(source);
      this.doughnutSourceChartData[0].push(self.getDataCount(groupBySource[source]));
    }
  }

  getSourceChartLabelColor(i){
    return this.doughnutSourceChartColors[0].backgroundColor[i];
  }

  assignDatatoBarChart(dateWiseData) {
    let dates = [];
    let intensiveCasesByDates = [];
    let confirmedCasesByDates = [];
    let dischargedByDates = []
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
    dateWiseData.sort((a, b) => {
      let dateA = new Date(a.confirmAt);
      let dateB = new Date(b.confirmAt);
      return dateA.getTime() - dateB.getTime();
    });
    let dateWiseCases = _.groupBy(dateWiseData, 'confirmAt');
    for (let cases in dateWiseCases) {
      dates.push(new Date(cases).getDate() + " " + months[new Date(cases).getMonth()]);
      intensiveCasesByDates.push(_.groupBy(dateWiseData, 'confirmAt')[cases].filter(x => x.caseType == "Intensive Care").length);
      confirmedCasesByDates.push(_.groupBy(dateWiseData, 'confirmAt')[cases].filter(x => x.caseType == "Confirmed").length);
      dischargedByDates.push(_.groupBy(dateWiseData, 'confirmAt')[cases].filter(x => x.caseType == "Recovered/Discharged").length);
    }

    this.barChartLabels = dates;
    this.barChartData = [
      { data: intensiveCasesByDates, label: 'INTENSIVE CARE CASES', stack: 'a' },
      { data: confirmedCasesByDates, label: 'CONFIRMED CASES', stack: 'a' },
      { data: dischargedByDates, label: ' DISCHARGED', stack: 'a' }
    ];
  }

  assigndoughnutChartData(dateWiseData: any[]) {
    this.doughnutChartLabels = [];
    this.doughnutChartData = [[]];
    let groupByGender = _.groupBy(dateWiseData, 'gender');
    for (let gender in groupByGender) {
      if (gender == 'Male' || gender == 'Female') {
        gender == 'Male' ? this.maleCount = this.getDataCount(groupByGender['Male']) : this.femaleCount = this.getDataCount(groupByGender['Female']);
        this.doughnutChartLabels.push(gender);
        this.doughnutChartData[0].push(this.getDataCount(groupByGender[gender]));
      }
    }
  }

  assignConfimedLineChartData(dateWiseData) {
    let self = this;
    self.lineChartConfirmedSourceLabels = [];
    self.lineChartConfirmedData[0].data = [];
    if (dateWiseData.length) {
      _.forEach(dateWiseData, function (value, key) {
        if (value.confirmedCasesByDates) {
          self.lineChartConfirmedSourceLabels.push(value.confirmAt);
          self.lineChartConfirmedData[0].data.push(value.confirmedCasesByDates);
        }
      });
    }
  }

  assignHospitalisedLineChartData(dateWiseData) {
    let self = this;
    self.lineChartSymptomaticSourceLabels = [];
    self.lineChartSymptomaticData[0].data = [];
    if (dateWiseData.length) {
      _.forEach(dateWiseData, function (value, key) {
        if (value.confirmedCasesByDates || value.reportedSympoMaticByDates) {
          self.lineChartSymptomaticSourceLabels.push(value.confirmAt);
          let totalHospitalisedCases = (value.confirmedCasesByDates || 0) + (value.reportedSympoMaticByDates || 0);
          self.lineChartSymptomaticData[0].data.push(totalHospitalisedCases);
        }
      });
    }
  }

  assignIntensiveLineChartData(dateWiseData) {
    let self = this;
    this.lineChartIntensiveSourceLabels = [];
    this.lineChartIntensiveData[0].data = [];
    if (dateWiseData.length) {
      _.forEach(dateWiseData, function (value, key) {
        if (value.icuByDate) {
          self.lineChartIntensiveSourceLabels.push(value.confirmAt);
          self.lineChartIntensiveData[0].data.push(value.icuByDate);
        }
      });
    }
  }

  assignDeathLineChartData(dateWiseData) {
    let self = this;
    self.lineChartDeathLabels = [];
    self.lineChartDeathData[0].data = [];
    if (dateWiseData.length) {
      let deathCases = _.groupBy(dateWiseData, 'status').DIED;
      if (deathCases) {
        let dateWiseCases = _.groupBy(deathCases, 'confirmAt');
        for (let dateCase in dateWiseCases) {
          self.lineChartDeathLabels.push(dateCase);
          self.lineChartDeathData[0].data.push(dateWiseCases[dateCase].length);
        }
      }
    }
  }

  assignDischargedLineChartData(dateWiseData) {
    let self = this;
    self.lineChartDischargeSourceLabels = [];
    self.lineChartDischargeData[0].data = [];
    if (dateWiseData.length) {
      _.forEach(dateWiseData, function (value, key) {
        if (value.dischargedByDates) {
          self.lineChartDischargeSourceLabels.push(value.confirmAt);
          self.lineChartDischargeData[0].data.push(value.dischargedByDates);
        }
      });
    }
  }

  getSortedObject(objectToSort) {
    var sortedObject = {};
    var arraysToSort = [];
    var obj: any;
    for (var o in objectToSort) {
      obj = {
        "state": o,
        "objects": objectToSort[o]
      }
      arraysToSort.push(obj);
    }
    arraysToSort.sort((a, b) => b.objects.length - a.objects.length);
    for (var i = 0; i < arraysToSort.length; i++) {
      obj = arraysToSort[i];
      sortedObject[obj.state] = obj.objects;
    }
    return sortedObject;

  }



  assignStateBarChartDate(dateWiseData) {
    this.stateBarChartLabels = [];
    this.stateBarChartData[0].data = [];

    if (dateWiseData.length) {
      var states = _.groupBy(dateWiseData, 'state');
      var sortedStates = this.getSortedObject(states);


      for (let state in sortedStates) {
        this.stateBarChartLabels.push(state);
        this.stateBarChartData[0].data.push(sortedStates[state].length);
      };

    }
  }

  dateFilterChanged(event) {
    if (!event) return;

    event[0].setHours(0, 0, 0, 0);
    event[1].setHours(23, 59, 59, 999);
    this.startDate = event[0];
    this.endDate = event[1];
    var filteredData = _.filter(this.patientsData, function (patient) {
      let patientsDate = new Date(patient.confirmAt);
      if (patientsDate >= event[0] && patientsDate <= event[1]) {
        return patient;
      }
    });
    this.setCasesAnalytics(filteredData);
    this.prepareBarChartData(filteredData);
    this.assigndoughnutNationalityChartData(filteredData);
    this.assignStateBarChartDate(filteredData);
    this.assignDeathLineChartData(filteredData);
    this.assignCumulativeConfirmChartData(filteredData);
  }

  setCasesAnalytics(filteredData) {
    this.totalCases = this.totalConfirmedCases = filteredData.length;
    this.totalHospitalisedCases = filteredData.filter(x => x.status == "HOSPITALIZED").length;
    this.totalDeathCases = filteredData.filter(x => x.status == "DIED").length;
    this.totalDischargedCases = filteredData.filter(x => x.status == "RECOVERED").length;
    this.totalIntesiveCases = filteredData.filter(x => x.caseType == "Intensive Care").length;
    this.maleCount = 0;
    this.femaleCount = 0;
    this.totalImportedTransmission = 0;
    this.totalLocalTransmission = 0;
    this.totalFemaleCases = 0;
    this.totalMaleCases = 0;
  }

}
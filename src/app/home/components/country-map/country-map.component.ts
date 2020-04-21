import {Component, OnInit} from '@angular/core';
import * as _ from 'lodash';
import { PatientsDataService } from 'src/app/services/patients-data.service';

declare var AmCharts:any;

@Component({
  selector: 'app-country-map',
  templateUrl: './country-map.component.html',
  styleUrls: ['./country-map.component.scss']
})
export class CountryMapComponent implements OnInit {
  constructor(private patientsDataService:PatientsDataService) { }
  countryMap:any;
  patientsData: any;
  recoveredPatientData: any;
  deceasedPatientData: any;
  
  ngOnInit() {
    this.generateMap();
    if(this.patientsDataService.patientsData){
      this.patientsData = this.patientsDataService.patientsData;
      this.assignMapData();
    }
    if(this.patientsDataService.recoveredPatientsData){
      this.recoveredPatientData = this.patientsDataService.recoveredPatientsData;
      this.assignMapData();
    }
    if(this.patientsDataService.deceasedPatientsData){
      this.deceasedPatientData = this.patientsDataService.deceasedPatientsData; 
      this.assignMapData();
    }

    // this.patientsDataService.patientsData.subscribe(data => {
    //   if (data) {
    //     this.patientsData = data;
    //     this.assignMapData();
    //   }
    // });

    // this.patientsDataService.recoveredPatientsData.subscribe(data => {
    //   if(data){
    //     this.recoveredPatientData = data;
    //     this.assignMapData();
    //   }
    // });

    // this.patientsDataService.deceasedPatientsData.subscribe(data => {   
    //   if(data){
    //     this.deceasedPatientData = data;
    //     this.assignMapData();
    //   }      
    // });
  }

  // ngOnChanges(changes: SimpleChanges) {
  //   let dateWiseCases = changes.cases.currentValue;
  //   if(dateWiseCases && dateWiseCases.length){
  //     if(!this.isInitialized){
  //       this.generateMap();
  //       this.isInitialized = true;
  //     }
  //     this.assignMapData(dateWiseCases);
  //   }
  // }

  assignMapData() {
    if (this.patientsData && this.deceasedPatientData && this.recoveredPatientData) {
      let states = this.countryMap.dataProvider.areas;
      let stateWiseConfirmCases = _.groupBy(this.patientsData, 'state');
      let stateWiseRecoveredCases =  _.groupBy(this.recoveredPatientData, 'state');
      let stateWiseDeceasedCases =  _.groupBy(this.deceasedPatientData, 'state');

      states.forEach((state, i) => {
        if (stateWiseConfirmCases[state.name]) {
          state.title = `${state.name} <br/>
          Confirmed Cases : ${stateWiseConfirmCases[state.name].length} <br/>
          Recovered Cases : ${stateWiseRecoveredCases[state.name] ? stateWiseRecoveredCases[state.name].length : 0 } <br/>
          Deceased Cases : ${stateWiseDeceasedCases[state.name] ? stateWiseDeceasedCases[state.name].length : 0} <br/>`;
          //Total Cases : ${stateWiseCases[state.name].length}`;
          state.color = this.getStateColor(stateWiseConfirmCases[state.name].length);
        } 
        else {
           state.title = `${state.name}  - Total Cases 0`;
         }
      });
      
      this.countryMap.dataProvider.areas = states;
      this.countryMap.validateData();      
    }
  }

  getStateColor(confirmedCaseCount) {
    if (confirmedCaseCount <= 100) {
      return "#FFE9E9";
    } else if (confirmedCaseCount > 100 && confirmedCaseCount <= 1000) {
      return "#FFADAD";
    } else if (confirmedCaseCount > 1000 && confirmedCaseCount <= 2000) {
      return "#FF5C5C";
    } else if (confirmedCaseCount > 2000) {
      return "#D60000";
    }

  }

  generateMap(){
    this.countryMap = AmCharts.makeChart("map",{
      "type": "map",
      "pathToImages": "http://www.amcharts.com/lib/3/images/",
      "addClassNames": true,
      "fontSize": 15,
      "color": "#FFFFFF",
      "projection": "mercator",
      "backgroundAlpha": 1,
      "backgroundColor": "rgba(249,243,243,1)",
      "dataProvider": {
        "map": "indiaLow",
        "getAreasFromMap": true,
        "images": [
          {
            "top": 40,
            "left": 60,
            "width": 0,
            "height": 0,
            "pixelMapperLogo": false
            // "imageURL": "http://pixelmap.amcharts.com/static/img/logo.svg",
            // "url": "http://www.amcharts.com"
          }
        ],
        "areas":[
          {
            "id": "IN-AP",
            "title": "Andhra Pradesh - Total Cases 0",
            "name":"Andhra Pradesh",
            "color": "#FFE9E9"
          },
          {
            "id": "IN-BR",
            "title": "Bihar - Total Cases 0",
            "name": "Bihar",
            "color": "#FFE9E9"
          },
          {
            "id": "IN-CH",
            "title": "Chandigarh - Total Cases 0",
            "name": "Chandigarh",
            "color": "#FFE9E9"
          },
          {
            "id": "IN-CT",
            "title": "Chhattisgarh - Total Cases 0",
            "name": "Chhattisgarh",
            "color": "#FFE9E9"
          },
          {
            "id": "IN-DL",
            "title": "Delhi - Total Cases 0",
            "name": "Delhi",
            "color": "#FFE9E9"
          },
          {
            "id": "IN-GJ",
            "title": "Gujarat - Total Cases 0",
            "name": "Gujarat",
            "color": "#FFE9E9"
          },
          {
            "id": "IN-HP",
            "title": "Himachal Pradesh - Total Cases 0",
            "name": "Himachal Pradesh",
            "color": "#FFE9E9"
          },
          {
            "id": "IN-HR",
            "title": "Haryana - Total Cases 0",
            "name": "Haryana",
            "color": "#FFE9E9"
          },
          {
            "id": "IN-JH",
            "title": "Jharkhand - Total Cases 0",
            "name": "Jharkhand",
            "color": "#FFE9E9"
          },
          {
            "id": "IN-JK",
            "title": "Jammu and Kashmir - Total Cases 0",
            "name": "Jammu and Kashmir",
            "color": "#FFE9E9"
          },
          {
            "id": "IN-KA",
            "title": "Karnataka - Total Cases 0",
            "name": "Karnataka",
            "color": "#FFE9E9"
          },
          {
            "id": "IN-KL",
            "title": "Kerala - Total Cases 0",
            "name": "Kerala",
            "color": "#FFE9E9"
          },
          {
            "id": "IN-MH",
            "title": "Maharashtra - Total Cases 0",
            "name": "Maharashtra",
            "color": "#FFE9E9"
          },
          {
            "id": "IN-MN",
            "title": "Manipur - Total Cases 0",
            "name": "Manipur",
            "color": "#FFE9E9"
          },
          {
            "id": "IN-MP",
            "title": "Madhya Pradesh - Total Cases 0",
            "name": "Madhya Pradesh",
            "color": "#FFE9E9"
          },
          {
            "id": "IN-OR",
            "title": "Odisha - Total Cases 0",
            "name": "Odisha",
            "color": "#FFE9E9"
          },
          {
            "id": "IN-PB",
            "title": "Punjab - Total Cases 0",
            "name": "Punjab",
            "color": "#FFE9E9"
          },
          {
            "id": "IN-PY",
            "title": "Puducherry - Total Cases 0",
            "name": "Puducherry",
            "color": "#FFE9E9"
          },
          {
            "id": "IN-RJ",
            "title": "Rajasthan - Total Cases 0",
            "name": "Rajasthan",
            "color": "#FFE9E9"
          },
          {
            "id": "IN-TG",
            "title": "Telangana - Total Cases 0",
            "name": "Telangana",
            "color": "#FFE9E9"
          },
          {
            "id": "IN-TN",
            "title": "Tamil Nadu - Total Cases 0",
            "name": "Tamil Nadu",
            "color": "#FFE9E9"
          },
          {
            "id": "IN-UP",
            "title": "Uttar Pradesh - Total Cases 0",
            "name": "Uttar Pradesh",
            "color": "#FFE9E9"
          },
          {
            "id": "IN-UT",
            "title": "Uttarakhand - Total Cases 0",
            "name": "Uttarakhand",
            "color": "#FFE9E9"
          },
          {
            "id": "IN-WB",
            "title": "West Bengal - Total Cases 0",
            "name": "West Bengal",
            "color": "#FFE9E9"
          },
          {
            "id": "IN-AN",
            "title": "Andaman and Nicobar Islands - Total Cases 0",
            "name": "Andaman and Nicobar Islands",
            "color": "#FFE9E9"
          },
          {
            "id": "IN-AR",
            "title": "Arunachal Pradesh - Total Cases 0",
            "name": "Arunachal Pradesh",
            "color": "#FFE9E9"
          },
          {
            "id": "IN-AS",
            "title": "Assam - Total Cases 0",
            "name": "Assam",
            "color": "#FFE9E9"
          },
          {
            "id": "IN-GA",
            "title": "Goa - Total Cases 0",
            "name": "Goa",
            "color": "#FFE9E9"
          },
          {
            "id": "IN-ML",
            "title": "Meghalaya - Total Cases 0",
            "name": "Meghalaya",
            "color": "#FFE9E9"
          },
          {
            "id": "IN-MZ",
            "title": "Mizoram - Total Cases 0",
            "name": "Mizoram",
            "color": "#FFE9E9"
          },
          {
            "id": "IN-NL",
            "title": "Nagaland - Total Cases 0",
            "name": "Nagaland",
            "color": "#FFE9E9"
          },
          {
            "id": "IN-SK",
            "title": "Sikkim - Total Cases 0",
            "name": "Sikkim",
            "color": "#FFE9E9"
          },
          {
            "id": "IN-TR",
            "title": "Tripura - Total Cases 0",
            "name": "Tripura",
            "color": "#FFE9E9"
          }
        ]
      },
      "balloon": {
        "horizontalPadding": 15,
        "borderAlpha": 0,
        "borderThickness": 1,
        "verticalPadding": 15
      },
      "areasSettings": {
        "color": "rgba(129,129,129,1)",
        "outlineColor": "rgba(80,80,80,0.1)",
        "rollOverOutlineColor": "rgba(80,80,80,1)",
        "rollOverBrightness": 20,
        "selectedBrightness": 20,
        "selectable": true,
        "unlistedAreasAlpha": 0,
        "unlistedAreasOutlineAlpha": 0
      },
      "imagesSettings": {
        "alpha": 1,
        "color": "rgba(129,129,129,1)",
        "outlineAlpha": 0,
        "rollOverOutlineAlpha": 0,
        "outlineColor": "rgba(80,80,80,1)",
        "rollOverBrightness": 20,
        "selectedBrightness": 20,
        "selectable": true
      },
      "linesSettings": {
        "color": "rgba(129,129,129,1)",
        "selectable": true,
        "rollOverBrightness": 20,
        "selectedBrightness": 20
      },
      "zoomControl": {
        "zoomControlEnabled": false,
        "homeButtonEnabled": false,
        "panControlEnabled": false,
        "right": 38,
        "bottom": 30,
        "minZoomLevel": 0.1,
        "gridHeight": 100,
        "gridAlpha": 1,
        "gridBackgroundAlpha": 0,
        "gridColor": "#f8f9fa",
        "draggerAlpha": 1,
        "buttonCornerRadius": 2
      }
    });
  }

}

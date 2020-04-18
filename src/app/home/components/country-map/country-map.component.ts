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
        } 
        else {
           state.title = `${state.name}  - Total Cases 0`;
         }
      });
      this.countryMap.dataProvider.areas = states;
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
      "backgroundColor": "rgba(255,255,255,1)",
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
            "color": "rgba(210,226,226,1)"
          },
          {
            "id": "IN-BR",
            "title": "Bihar - Total Cases 0",
            "name": "Bihar",
            "color": "rgba(232,218,208,1)"
          },
          {
            "id": "IN-CH",
            "title": "Chandigarh - Total Cases 0",
            "name": "Chandigarh",
            "color": "rgba(168,255,168,1)"
          },
          {
            "id": "IN-CT",
            "title": "Chhattisgarh - Total Cases 0",
            "name": "Chhattisgarh",
            "color": "rgba(175,154,175,1)"
          },
          {
            "id": "IN-DL",
            "title": "Delhi - Total Cases 0",
            "name": "Delhi",
            "color": "rgba(228,255,144,1)"
          },
          {
            "id": "IN-GJ",
            "title": "Gujarat - Total Cases 0",
            "name": "Gujarat",
            "color": "rgba(184,253,225,1)"
          },
          {
            "id": "IN-HP",
            "title": "Himachal Pradesh - Total Cases 0",
            "name": "Himachal Pradesh",
            "color": "rgba(163,199,197,1)"
          },
          {
            "id": "IN-HR",
            "title": "Haryana - Total Cases 0",
            "name": "Haryana",
            "color": "rgba(220,237,193,1)"
          },
          {
            "id": "IN-JH",
            "title": "Jharkhand - Total Cases 0",
            "name": "Jharkhand",
            "color": "rgba(172,114,226,1)"
          },
          {
            "id": "IN-JK",
            "title": "Jammu and Kashmir - Total Cases 0",
            "name": "Jammu and Kashmir",
            "color": "rgba(255,195,160,1)"
          },
          {
            "id": "IN-KA",
            "title": "Karnataka - Total Cases 0",
            "name": "Karnataka",
            "color": "rgba(255,199,247,1)"
          },
          {
            "id": "IN-KL",
            "title": "Kerala - Total Cases 0",
            "name": "Kerala",
            "color": "rgba(255,161,181,1)"
          },
          {
            "id": "IN-MH",
            "title": "Maharashtra - Total Cases 0",
            "name": "Maharashtra",
            "color": "rgba(134,199,243,1)"
          },
          {
            "id": "IN-MN",
            "title": "Manipur - Total Cases 0",
            "name": "Manipur",
            "color": "rgba(158,158,214,1)"
          },
          {
            "id": "IN-MP",
            "title": "Madhya Pradesh - Total Cases 0",
            "name": "Madhya Pradesh",
            "color": "rgba(255,255,137,1)"
          },
          {
            "id": "IN-OR",
            "title": "Odisha - Total Cases 0",
            "name": "Odisha",
            "color": "rgba(224,185,187,1)"
          },
          {
            "id": "IN-PB",
            "title": "Punjab - Total Cases 0",
            "name": "Punjab",
            "color": "rgba(226,207,216,1)"
          },
          {
            "id": "IN-PY",
            "title": "Puducherry - Total Cases 0",
            "name": "Puducherry",
            "color": "rgba(204,216,157,1)"
          },
          {
            "id": "IN-RJ",
            "title": "Rajasthan - Total Cases 0",
            "name": "Rajasthan",
            "color": "rgba(255,178,178,1)"
          },
          {
            "id": "IN-TG",
            "title": "Telangana - Total Cases 0",
            "name": "Telangana",
            "color": "rgba(197,208,210,1)"
          },
          {
            "id": "IN-TN",
            "title": "Tamil Nadu - Total Cases 0",
            "name": "Tamil Nadu",
            "color": "rgba(230,230,250,1)"
          },
          {
            "id": "IN-UP",
            "title": "Uttar Pradesh - Total Cases 0",
            "name": "Uttar Pradesh",
            "color": "rgba(255,226,154,1)"
          },
          {
            "id": "IN-UT",
            "title": "Uttarakhand - Total Cases 0",
            "name": "Uttarakhand",
            "color": "rgba(195,151,151,1)"
          },
          {
            "id": "IN-WB",
            "title": "West Bengal - Total Cases 0",
            "name": "West Bengal",
            "color": "rgba(239,224,198,1)"
          },
          {
            "id": "IN-AN",
            "title": "Andaman and Nicobar Islands - Total Cases 0",
            "name": "Andaman and Nicobar Islands",
            "color": "rgba(248,220,136,1)"
          },
          {
            "id": "IN-AR",
            "title": "Arunachal Pradesh - Total Cases 0",
            "name": "Arunachal Pradesh",
            "color": "rgba(208,168,146,1)"
          },
          {
            "id": "IN-AS",
            "title": "Assam - Total Cases 0",
            "name": "Assam",
            "color": "rgba(255,201,103,1)"
          },
          {
            "id": "IN-GA",
            "title": "Goa - Total Cases 0",
            "name": "Goa",
            "color": "rgba(204,14,116,1)"
          },
          {
            "id": "IN-ML",
            "title": "Meghalaya - Total Cases 0",
            "name": "Meghalaya",
            "color": "rgba(194,201,180,1)"
          },
          {
            "id": "IN-MZ",
            "title": "Mizoram - Total Cases 0",
            "name": "Mizoram",
            "color": "rgba(132,169,172,1)"
          },
          {
            "id": "IN-NL",
            "title": "Nagaland - Total Cases 0",
            "name": "Nagaland",
            "color": "rgba(216,244,175,1)"
          },
          {
            "id": "IN-SK",
            "title": "Sikkim - Total Cases 0",
            "name": "Sikkim",
            "color": "rgba(167,162,162,1)"
          },
          {
            "id": "IN-TR",
            "title": "Tripura - Total Cases 0",
            "name": "Tripura",
            "color": "rgba(245,252,193,1)"
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
        "outlineColor": "rgba(80,80,80,0.2)",
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

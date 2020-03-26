import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import * as _ from 'lodash';

declare var AmCharts:any;

@Component({
  selector: 'app-country-map',
  templateUrl: './country-map.component.html',
  styleUrls: ['./country-map.component.scss']
})
export class CountryMapComponent implements OnInit {
  @Input() cases:any;
  constructor() { }
  countryMap:any;

  ngOnInit() {
    this.generateMap();
  }

  ngOnChanges(changes: SimpleChanges) {
    let dateWiseCases = changes.cases.currentValue;
    if(dateWiseCases && dateWiseCases.length){
      this.assignMapData(dateWiseCases);
    }
  }

  assignMapData(dateWiseCases){
    let states = [
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
        "title": "J&K - Total Cases 0",
        "name": "J&K",
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
        "title": "Rajasthan - Total Cases 0",
        "name": "Rajasthan",
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
      }
    ];
    
    let stateWiseCases = _.groupBy(dateWiseCases,'state');
    for(let state in stateWiseCases){
      let index = states.findIndex(x => x.name == state);
      if(index !== -1){
        states[index].title = `${states[index].name} - Total Cases ${stateWiseCases[state].length}`;
      }
    }

    this.countryMap.dataProvider.areas = states;
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
        "areas": []
      },
      "balloon": {
        "horizontalPadding": 15,
        "borderAlpha": 0,
        "borderThickness": 1,
        "verticalPadding": 15
      },
      "areasSettings": {
        "color": "rgba(129,129,129,1)",
        "outlineColor": "rgba(80,80,80,1)",
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

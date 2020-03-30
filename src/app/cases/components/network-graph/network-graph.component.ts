import { Component, OnInit } from '@angular/core';
import * as vis from 'vis';
import * as _ from 'lodash';
import { PatientsDataService } from 'src/app/services/patients-data.service';
@Component({
  selector: 'app-network-graph',
  templateUrl: './network-graph.component.html',
  styleUrls: ['./network-graph.component.scss']
})
export class NetworkGraphComponent implements OnInit {
  public states:[];
  cities: [];
  selectedCity="";
  patientsData:any;
  caseTypeFilter: any;
  constructor(private patientsDataService:PatientsDataService) { }

  ngOnInit() {
    this.patientsDataService.patientsData.subscribe(data =>{
      if(data){
        var roleIds=[];
        this.states=_.uniq(_.map(data, x => { return x.state; })).sort();
        this.prepareCitiesForDropdown(data);
        data.forEach((element,i) => {
          if(roleIds.includes(element.caseNumber)){
            data[i].caseNumber=parseInt(element.caseNumber)+i+1000;
          }
          roleIds.push( data[i].caseNumber);
        });
        this.prepareDataForNetwork(data)
        this.patientsData=data;
      }
    });
  }
  onStateChange(event,hasCity?){
    if(!hasCity){
      var city:any = document.getElementById('city');
      city.value="";
    }
    this.prepareCitiesForDropdown(_.filter(this.patientsData,x => {return x.state==event;}))
  }

  applyFilters(){
    var state:any = document.getElementById('state');
    var city:any = document.getElementById('city');
    var caseType:any = document.getElementById('caseType');
    var filteredData;
    if(state.value){
     filteredData=_.filter(this.patientsData,x => {return x.state==state.value;});
    }else{
      filteredData=this.patientsData;
    }
    if(city.value){
      filteredData = _.filter(filteredData,x => {return x.cityName==city.value;});
    }
    if(caseType.value){
      filteredData = _.filter(filteredData,x => {return x.caseType==caseType.value;});
    }
    if(!state.value){
      state.selectedIndex =_.findIndex(state.options,{value:filteredData[0].state});
      this.onStateChange(filteredData[0].state,true);
    }
    this.prepareDataForNetwork(filteredData);
  }

  prepareCitiesForDropdown(data) {
    this.cities=_.uniq(_.map(data, x => { return x.cityName; })).sort();
  }

  prepareDataForNetwork(data: any) {
    var self=this;
    var nodesArray = [];
    var edgesArray = [];
    data.forEach(element => {
      let nodeData={};
      nodeData["id"]=parseInt(element.caseNumber);
      nodeData["label"]="case " + element.caseNumber;
      nodeData["shape"]="circularImage";
      nodeData["color"]={ inherit: "id" };
      if(element.gender=="female"){
        if(element.source=="Imported"){
          nodeData["image"]="/assets/images/importedFemale.png";
        }else{
          nodeData["image"]="/assets/images/female.jpg";
        }
      }else{
        if(element.source=="Imported"){
          nodeData["image"]="/assets/images/importedMale.png";
        }else{
          nodeData["image"]="/assets/images/male.jpg";
        }
      }
      nodeData["group"]=element.caseType;
      nodesArray.push(nodeData);
      if(element.related){
      let edgeData={};
      edgeData["to"]=parseInt(element.caseNumber);
      edgeData["from"]=element.related;
      if(element.relation){
        edgeData["label"]=element.relation;
      }
      edgeData["arrowhead"]="normal";
      edgeData["color"]={ inherit: "to" };
      edgeData["arrows"]= "to";
      edgeData["dashes"]= true;
      edgesArray.push(edgeData);
    }
    });

    let nodes=new vis.DataSet(nodesArray);
    let edges = new vis.DataSet(edgesArray);
    var container = document.getElementById("mynetwork");
    let networkdata = {
        nodes: nodes,
        edges: edges
      };
      var options = {
        nodes: {
          shape: "circularImage",
          borderWidth: 2,
          size: 36,
          shapeProperties: {
            useBorderWithImage: true
          }
        },
        layout: {
          randomSeed: 60
        },
        physics: {
          forceAtlas2Based: {
            gravitationalConstant: -26,
            centralGravity: 0.005,
            springLength: 170,
            springConstant: 0.18
          },
          maxVelocity: 146,
          solver: "forceAtlas2Based",
          timestep: 0.35,
          stabilization: {
            enabled: true,
            iterations: 2000,
            updateInterval: 25
          }
        },
        groups:{
          Confirmed:{
            color: {  border: "blue" },
          },
          Deceased:{
            color: {  border: "red" },
          },
          "Recovered/Discharged":{
            color: {  border: "green" },
          }
        }
      };
      var network = new vis.Network(container, networkdata, options);
      network.on("stabilizationProgress", function(params) {
        var maxWidth = 496;
        var minWidth = 20;
        var widthFactor = params.iterations / params.total;
        var width = Math.max(minWidth, maxWidth * widthFactor);

        document.getElementById("bar").style.width = width + "px";
        document.getElementById("text").innerHTML =
          Math.round(widthFactor * 100) + "%";
      });
      network.once("stabilizationIterationsDone", function() {
        document.getElementById("text").innerHTML = "100%";
        document.getElementById("bar").style.width = "496px";
        document.getElementById("loadingBar").style.opacity = "0";
        // really clean the dom element
        setTimeout(function() {
          document.getElementById("loadingBar").style.display = "none";
        }, 500);
      });
  }

}

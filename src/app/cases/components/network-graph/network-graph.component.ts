import { Component, OnInit } from '@angular/core';
import * as vis from 'vis';
import { PatientsDataService } from 'src/app/services/patients-data.service';
@Component({
  selector: 'app-network-graph',
  templateUrl: './network-graph.component.html',
  styleUrls: ['./network-graph.component.scss']
})
export class NetworkGraphComponent implements OnInit {

  constructor(private patientsDataService:PatientsDataService) { }

  ngOnInit() {
    this.patientsDataService.patientsData.subscribe(data =>{
      if(data){
        this.prepareDataForNetwork(data)
      }
    });
  }

  prepareDataForNetwork(data: any) {
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
      nodeData["group"]=element.related ?  element.related : 0;
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
          shape: "dot",
          size: 16
        },
        layout: {
          randomSeed: 34
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

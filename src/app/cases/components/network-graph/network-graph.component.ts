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
    this.patientsDataService.patientsdummyData.subscribe(data =>{
      if(data){
        this.prepareDataForNetwork(data)
      }
    });
    // var nodesArray = [
    //   { id: 1, label: "Node 1" ,shape:"circularImage",image:"https://res.cloudinary.com/demo/image/fetch/http://upload.wikimedia.org/wikipedia/commons/4/46/Jennifer_Lawrence_at_the_83rd_Academy_Awards.jpg"},
    //   { id: 2, label: "Node 2", group:1 },
    //   { id: 3, label: "Node 3", group:1 },
    //   { id: 4, label: "Node 4", group:1 },
    //   { id: 5, label: "Node 5" },
    //   { id: 6, label: "Node 6" },
    //   { id: 7, label: "Node 7" },
    //   { id: 8, label: "Node 8" },
    //   { id: 9, label: "Node 9" },
    //   { id: 10, label: "Node 10" },
    //   { id: 11, label: "Node 11" }
    // ];
    // let nodes=new vis.DataSet(nodesArray);
    // let edgesArray = [
    //   { from: 1, to: 3 ,label:"tryout",arrowhead:"normal",color:{color:"gray"} ,arrows: "to", dashes: true},
    //   { from: 1, to: 2 },
    //   { from: 2, to: 4  },
    //   { from: 2, to: 5 },
    //   { from: 1, to: 6 },
    //   { from: 1, to: 7 },
    //   { from: 1, to: 8 },
    //   { from: 1, to: 9 },
    //   { from: 1, to: 10 },
    //   { from: 1, to: 11 }
    // ];
    // let edges = new vis.DataSet(edgesArray);

  //   var container = document.getElementById("mynetwork");
  // var data = {
  //   nodes: nodes,
  //   edges: edges
  // };
  // var options = {};
  // var network = new vis.Network(container, data, options);
  // var networkedData = {

  // }
  }

  prepareDataForNetwork(data: any) {
    var nodesArray = [];
    var edgesArray = [];
    data.forEach(element => {
      let nodeData={};
      nodeData["id"]=element.caseNumber;
      nodeData["label"]="case " + element.caseNumber;
      nodeData["shape"]="circularImage";
      if(element.gender=="female"){
        nodeData["image"]="/assets/images/female.jpg";
      }else{
        nodeData["image"]="/assets/images/male.jpg";
      }
      nodeData["group"]=element.related ?  element.related : 0;
      console.log(nodeData["group"]);
      nodesArray.push(nodeData);
      if(element.related){
      let edgeData={};
      edgeData["to"]=element.caseNumber;
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
            springLength: 230,
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

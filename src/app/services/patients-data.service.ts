import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
//import { AngularFirestore } from '@angular/fire/firestore';
import * as _ from 'lodash';
import * as moment from 'moment';
import { map } from 'rxjs/operators';
import { Meta } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class PatientsDataService {
  apiUrl: string;
  titleSubject = new Subject();
  metaData = new Subject();

  constructor(
    protected http: HttpClient, private metadata: Meta
  ) {
  }
  public patientsData:any;
  public testsConductedData:any;
  public recoveredPatientsData:any;
  public deceasedPatientsData:any;
  public stateDistrictWiseData: any;
  
  // loadPatientsData() {
  //   this.patientsData = PatientsDataJson;
  //   let cases: any = this.patientsData;
  //     cases.sort((a, b) => {
  //       return moment(a.confirmAt, "DD/MM/YYYY").toDate().getTime() - moment(b.confirmAt, "DD/MM/YYYY").toDate().getTime();
  //     });
  //     this.patientsData=cases;


  // }

  loadCasesData(){
    return this.http.get("https://api.covid19india.org/data.json");
  }

  loadStateDistrictData(){
    return this.http.get("https://api.covid19india.org/state_district_wise.json");
  }

  // loadTestConductedData() {
  //   this.testsConductedData=IcmrTestsDataJSON;
  //     let tests: any = this.testsConductedData;
  //     //console.log(tests);
  //     let dateWiseData = tests.sort((a, b) => {
  //       //return new Date(a.ConductedOn).getTime() - new Date(b.ConductedOn).getTime();
  //       return moment(a.ConductedOn, "DD-MM-YYYY").toDate().getTime() - moment(b.ConductedOn, "DD-MM-YYYY").toDate().getTime();
  //     });
  //     this.testsConductedData=dateWiseData;
  // }

  // loadClosedCasesData() {
  //     let closedCases: any = RecoveryandDeathJSON;
      
  //     let dateWiseData = closedCases.sort((a, b) => {
  //       return moment(a.date, "DD/MM/YYYY").toDate().getTime() - moment(b.date, "DD/MM/YYYY").toDate().getTime();
  //     });
  //     let recoveredCasesData = dateWiseData.filter(x => x.patientstatus.toLowerCase() == "recovered");
  //     let deceasedCasesData = dateWiseData.filter(x => x.patientstatus.toLowerCase() == "deceased");
      
  //     this.recoveredPatientsData=recoveredCasesData;
  //     this.deceasedPatientsData=deceasedCasesData;
 
  // }

  loadGovtData() {
    return this.http.get('https://www.mohfw.gov.in/', { responseType: 'text' })
      .pipe(
        map((html: any) => {
          return html;
        })
      );
  }

  filterDataByDates(patientRecords: any) {
    var self = this;
    var dateWiseData = [];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    _.forEach(patientRecords, function (patient) {
      let patientsDate = new Date(patient.confirmAt);
      var foundDAta = _.find(dateWiseData, function (x) {
        if (new Date(x.confirmAt).getDate() == patientsDate.getDate()) {
          if (new Date(x.confirmAt).getMonth() == patientsDate.getMonth()) {
            if (new Date(x.confirmAt).getFullYear() == patientsDate.getFullYear()) {
              return true;
            }
          }
        }
      });
      if (foundDAta) {
        foundDAta = self.filterDataByCasetype(foundDAta, patient);
      } else {
        let data = {};
        data["confirmAt"] = patient.confirmAt;
        data["confirmedInMonth"] = months[patientsDate.getMonth()];
        data = self.filterDataByCasetype(data, patient);
        dateWiseData.push(data);
      }
    });
    return _.sortBy(dateWiseData, function (x) { return new Date(x.confirmAt); });
  }

  filterDataByCasetype(data: {}, patient: any): {} {
    if (patient.status == 'HOSPITALIZED' || 'Hospitalized') {
      data['confirmedCasesByDates'] = data['confirmedCasesByDates'] + 1 || 1;
    }
    if (patient.status == 'SYMPTOMATIC') {
      data['reportedSympoMaticByDates'] = data['reportedSympoMaticByDates'] + 1 || 1;
    }
    if (patient.status == 'RECOVERED') {
      data['dischargedByDates'] = data['dischargedByDates'] + 1 || 1;
    }
    if (patient.caseType == "Intensive Care") {
      data['icuByDate'] = data['icuByDate'] + 1 || 1;
    }
    data["gender"] = patient.gender;
    data["source"] = patient.source;
    data["nationality"] = patient.nationality;
    data["caseType"] = patient.caseType;
    return data;
  }
}

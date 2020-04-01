import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import * as _ from 'lodash';
import { map } from 'rxjs/operators';
import { Meta } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class PatientsDataService {
  apiUrl: string;
  titleSubject = new Subject();
  metaData = new Subject();
  public covid19TotalConfirmedCases = new BehaviorSubject(null);
  public covid19TotalDeaths = new BehaviorSubject(null);


  constructor(
    private firestore: AngularFirestore, 
    protected http: HttpClient, private metadata: Meta
  ) {
  }
  public patientsData = new BehaviorSubject(null);
  public testsConductedData = new BehaviorSubject(null);

  loadPatientsData() {
    return this.firestore.collection<any>('newCases').snapshotChanges().subscribe(data => {
      let covidCases = data.map(item => {
        var data = item.payload.doc.data();
        data.id = item.payload.doc.id;
        return data;
      });
      this.patientsData.next(covidCases);
    });
  }

  loadTestConductedData() {
    return this.firestore.collection<any>('Tests').snapshotChanges().subscribe(data => {
      if(data){
        let testsConducted = data.map(item => {
          var data = item.payload.doc.data();
          data.id = item.payload.doc.id;
          return data;
        });
        this.testsConductedData.next(testsConducted);
      }
    });
  }

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
    if (patient.status == 'HOSPITALIZED') {
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

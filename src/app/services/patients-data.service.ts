import { Injectable  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class PatientsDataService {
  constructor( protected http: HttpClient ) { }
  public patientsData=new BehaviorSubject(null);

  loadPatientsData(){
    let url="assets/data/patientsData.json";
    this.http.get(url).subscribe(data=>{
      this.patientsData.next(data);
    });
  }

  filterDataByDates(patientRecords: any) {
    var self = this;
    var dateWiseData=[];
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
        data["confirmAt"] = patientsDate.getDate() + " " + months[patientsDate.getMonth()] + " " + patientsDate.getFullYear();
        data["confirmedInMonth"] = months[patientsDate.getMonth()];
        data = self.filterDataByCasetype(data, patient);
        dateWiseData.push(data);
      }
    });
    return _.sortBy(dateWiseData, function(x) { return new Date(x.confirmAt); });
  }

  filterDataByCasetype(data: {},patient:any): {} {
    if (patient.caseType == 'HOSPITALIZED') {
      data['confirmedCasesByDates'] = data['confirmedCasesByDates'] + 1 || 1;
    }
    if (patient.caseType == 'SYMPTOMATIC') {
      data['reportedSympoMaticByDates'] = data['reportedSympoMaticByDates'] + 1 || 1;
    }
    if (patient.caseType == 'RECOVERED') {
      data['dischargedByDates'] = data['dischargedByDates'] + 1 || 1;
    }
    if (patient.icu_on) {
      data['icuByDate'] = data['icuByDate'] + 1 || 1;
    }
    data["gender"]=patient.gender || 'male';
    data["source"]=patient.source || 'Local';
    data["nationality"]=patient.nationality;
    data["caseType"]=patient.caseType;
    return data;
  }
}

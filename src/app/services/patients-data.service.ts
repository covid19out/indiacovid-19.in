import { Injectable  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

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

}

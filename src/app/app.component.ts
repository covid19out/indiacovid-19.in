import { Component } from '@angular/core';
import { Router,NavigationStart,NavigationEnd, ActivatedRoute} from '@angular/router';
import { PatientsDataService } from './services/patients-data.service';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  //title = 'INDIA COVID-19 - Corona Virus Updates';

  constructor(private PatientsDataService:PatientsDataService,private router: Router,private activatedRoute:ActivatedRoute,private metaTag:Meta){
    this.PatientsDataService.loadPatientsData();
  }
  ngOnInit() {
    this.PatientsDataService.titleSubject.subscribe((data:string) =>{
      if(data){
        // this.title=data;
        var title=document.getElementsByTagName("title")[0];
        title.innerText=data;
      }
    });

    this.PatientsDataService.metaData.subscribe((data:any)=>{
      if(data){
      this.metaTag.updateTag(data);
      }
    });

      this.router.events.subscribe(event => {
        if (event instanceof NavigationStart) {
          if (!!event.url && event.url.match(/^\/#/)) {
            this.router.navigate([event.url.replace('/#', '')]);
          }
        }
        if(event instanceof NavigationEnd){
          let child = this.activatedRoute.firstChild;
          while(child.firstChild){
            child = child.firstChild;
          }
          if(child.snapshot.data['title']){
            this.PatientsDataService.titleSubject.next(child.snapshot.data['title']);
          }
        }
      });
    }
}

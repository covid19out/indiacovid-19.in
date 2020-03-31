import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-awareness',
  templateUrl: './awareness.component.html',
  styleUrls: ['./awareness.component.scss']
})
export class AwarenessComponent implements OnInit {
  pager={pageCount:[],currentPage:0};
  constructor() { }

  ngOnInit() {
    let columns:any=document.getElementsByClassName("blog-post");
    let pages= columns.length%9==0 ?  Math.round(columns.length/9) : Math.round(columns.length/9) + 1;

    this.pager.pageCount=[];
    for(let i=1;i<=pages;i++){
      this.pager.pageCount.push(i);
    }
    this.applyPagination(1);
  }
  applyPagination(pageNumber) {
    if(pageNumber < 1 || pageNumber >  this.pager.pageCount.length) return;
    var columns:any=document.getElementsByClassName("blog-post");
    this.pager.currentPage=pageNumber;
    Array.from(columns).forEach((element:any,i) => {
      if(((pageNumber-1)*9 <= (i) && i < (pageNumber) * 9 )){
        element.classList.remove("hidden");
      }else{
        element.classList.add("hidden");
      }
    });
  }

}

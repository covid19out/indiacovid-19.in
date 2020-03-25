import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent implements OnInit {
@Input() maxValue : number;
counter: number = 0;
  constructor() { }

  ngOnInit() {
    let i = 0;
    while(i <= this.maxValue){
      this.incrementCounter(i++);
    }
  }

  incrementCounter(count){    
    setTimeout(this.setCounter.bind(this),700,count);
  }

  setCounter(count){
    this.counter = count;
  }

}

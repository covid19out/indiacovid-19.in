import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaerBarChartComponent } from './heaer-bar-chart.component';

describe('HeaerBarChartComponent', () => {
  let component: HeaerBarChartComponent;
  let fixture: ComponentFixture<HeaerBarChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaerBarChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaerBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

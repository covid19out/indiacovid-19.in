import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestConductedCumulativeChartComponent } from './test-conducted-cumulative-chart.component';

describe('TestConductedCumulativeChartComponent', () => {
  let component: TestConductedCumulativeChartComponent;
  let fixture: ComponentFixture<TestConductedCumulativeChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestConductedCumulativeChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestConductedCumulativeChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

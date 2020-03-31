import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmCumulativeChartComponent } from './confirm-cumulative-chart.component';

describe('ConfirmCumulativeChartComponent', () => {
  let component: ConfirmCumulativeChartComponent;
  let fixture: ComponentFixture<ConfirmCumulativeChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmCumulativeChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmCumulativeChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderBarChartComponent } from './header-bar-chart.component';

describe('HeaderBarChartComponent', () => {
  let component: HeaderBarChartComponent;
  let fixture: ComponentFixture<HeaderBarChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderBarChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

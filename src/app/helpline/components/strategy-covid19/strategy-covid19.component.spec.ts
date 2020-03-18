import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StrategyCovid19Component } from './strategy-covid19.component';

describe('StrategyCovid19Component', () => {
  let component: StrategyCovid19Component;
  let fixture: ComponentFixture<StrategyCovid19Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StrategyCovid19Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StrategyCovid19Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

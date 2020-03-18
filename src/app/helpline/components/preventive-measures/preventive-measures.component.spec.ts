import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreventiveMeasuresComponent } from './preventive-measures.component';

describe('PreventiveMeasuresComponent', () => {
  let component: PreventiveMeasuresComponent;
  let fixture: ComponentFixture<PreventiveMeasuresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreventiveMeasuresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreventiveMeasuresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

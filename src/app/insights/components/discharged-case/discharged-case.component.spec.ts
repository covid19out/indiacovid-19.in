import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DischargedCaseComponent } from './discharged-case.component';

describe('DischargedCaseComponent', () => {
  let component: DischargedCaseComponent;
  let fixture: ComponentFixture<DischargedCaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DischargedCaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DischargedCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

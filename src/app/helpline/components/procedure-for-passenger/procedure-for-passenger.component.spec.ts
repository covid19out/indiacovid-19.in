import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcedureForPassengerComponent } from './procedure-for-passenger.component';

describe('ProcedureForPassengerComponent', () => {
  let component: ProcedureForPassengerComponent;
  let fixture: ComponentFixture<ProcedureForPassengerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcedureForPassengerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcedureForPassengerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

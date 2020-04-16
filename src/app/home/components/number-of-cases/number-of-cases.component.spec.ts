import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberOfCasesComponent } from './number-of-cases.component';

describe('NumberOfCasesComponent', () => {
  let component: NumberOfCasesComponent;
  let fixture: ComponentFixture<NumberOfCasesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumberOfCasesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberOfCasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

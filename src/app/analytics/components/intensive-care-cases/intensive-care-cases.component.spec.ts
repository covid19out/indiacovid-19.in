import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntensiveCareCasesComponent } from './intensive-care-cases.component';

describe('IntensiveCareCasesComponent', () => {
  let component: IntensiveCareCasesComponent;
  let fixture: ComponentFixture<IntensiveCareCasesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntensiveCareCasesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntensiveCareCasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

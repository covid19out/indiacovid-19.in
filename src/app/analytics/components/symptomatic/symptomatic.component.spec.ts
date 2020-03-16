import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SymptomaticComponent } from './symptomatic.component';

describe('SymptomaticComponent', () => {
  let component: SymptomaticComponent;
  let fixture: ComponentFixture<SymptomaticComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SymptomaticComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SymptomaticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

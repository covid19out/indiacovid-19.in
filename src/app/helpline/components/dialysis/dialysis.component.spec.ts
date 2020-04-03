import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialysisComponent } from './dialysis.component';

describe('DialysisComponent', () => {
  let component: DialysisComponent;
  let fixture: ComponentFixture<DialysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

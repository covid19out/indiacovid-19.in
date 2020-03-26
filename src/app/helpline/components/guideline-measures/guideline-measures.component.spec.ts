import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuidelineMeasuresComponent } from './guideline-measures.component';

describe('GuidelineMeasuresComponent', () => {
  let component: GuidelineMeasuresComponent;
  let fixture: ComponentFixture<GuidelineMeasuresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuidelineMeasuresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuidelineMeasuresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

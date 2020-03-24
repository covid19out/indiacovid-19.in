import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisedStrategyComponent } from './revised-strategy.component';

describe('RevisedStrategyComponent', () => {
  let component: RevisedStrategyComponent;
  let fixture: ComponentFixture<RevisedStrategyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RevisedStrategyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevisedStrategyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

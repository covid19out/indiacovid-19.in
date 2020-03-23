import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StateCardsComponent } from './state-cards.component';

describe('StateCardsComponent', () => {
  let component: StateCardsComponent;
  let fixture: ComponentFixture<StateCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StateCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StateCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

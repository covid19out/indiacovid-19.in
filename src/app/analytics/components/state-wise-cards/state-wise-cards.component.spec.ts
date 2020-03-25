import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StateWiseCardsComponent } from './state-wise-cards.component';

describe('StateWiseCardsComponent', () => {
  let component: StateWiseCardsComponent;
  let fixture: ComponentFixture<StateWiseCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StateWiseCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StateWiseCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopStateCardsComponent } from './top-state-cards.component';

describe('TopStateCardsComponent', () => {
  let component: TopStateCardsComponent;
  let fixture: ComponentFixture<TopStateCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopStateCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopStateCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

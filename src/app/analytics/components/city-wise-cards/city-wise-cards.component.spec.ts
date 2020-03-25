import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CityWiseCardsComponent } from './city-wise-cards.component';

describe('CityWiseCardsComponent', () => {
  let component: CityWiseCardsComponent;
  let fixture: ComponentFixture<CityWiseCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CityWiseCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CityWiseCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

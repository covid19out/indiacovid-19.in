import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalAdvisoryComponent } from './additional-advisory.component';

describe('AdditionalAdvisoryComponent', () => {
  let component: AdditionalAdvisoryComponent;
  let fixture: ComponentFixture<AdditionalAdvisoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdditionalAdvisoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionalAdvisoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

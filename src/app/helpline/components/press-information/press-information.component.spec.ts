import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PressInformationComponent } from './press-information.component';

describe('PressInformationComponent', () => {
  let component: PressInformationComponent;
  let fixture: ComponentFixture<PressInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PressInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PressInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

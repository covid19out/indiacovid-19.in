import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeMemorandumComponent } from './office-memorandum.component';

describe('OfficeMemorandumComponent', () => {
  let component: OfficeMemorandumComponent;
  let fixture: ComponentFixture<OfficeMemorandumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfficeMemorandumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficeMemorandumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

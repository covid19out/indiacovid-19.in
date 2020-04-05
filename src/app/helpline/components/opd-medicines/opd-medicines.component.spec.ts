import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpdMedicinesComponent } from './opd-medicines.component';

describe('OpdMedicinesComponent', () => {
  let component: OpdMedicinesComponent;
  let fixture: ComponentFixture<OpdMedicinesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpdMedicinesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpdMedicinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

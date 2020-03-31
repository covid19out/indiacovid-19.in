import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VentilatorComponent } from './ventilator.component';

describe('VentilatorComponent', () => {
  let component: VentilatorComponent;
  let fixture: ComponentFixture<VentilatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VentilatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VentilatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

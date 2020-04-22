import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthAdvisoryComponent } from './health-advisory.component';

describe('HealthAdvisoryComponent', () => {
  let component: HealthAdvisoryComponent;
  let fixture: ComponentFixture<HealthAdvisoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthAdvisoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthAdvisoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

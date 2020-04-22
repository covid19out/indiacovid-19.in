import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestingCenterComponent } from './testing-center.component';

describe('TestingCenterComponent', () => {
  let component: TestingCenterComponent;
  let fixture: ComponentFixture<TestingCenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestingCenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestingCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

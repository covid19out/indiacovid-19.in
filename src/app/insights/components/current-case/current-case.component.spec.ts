import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentCaseComponent } from './current-case.component';

describe('CurrentCaseComponent', () => {
  let component: CurrentCaseComponent;
  let fixture: ComponentFixture<CurrentCaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentCaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

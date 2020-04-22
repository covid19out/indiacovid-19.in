import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifyingPersonsComponent } from './notifying-persons.component';

describe('NotifyingPersonsComponent', () => {
  let component: NotifyingPersonsComponent;
  let fixture: ComponentFixture<NotifyingPersonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotifyingPersonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotifyingPersonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

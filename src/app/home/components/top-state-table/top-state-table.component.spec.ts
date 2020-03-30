import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopStateTableComponent } from './top-state-table.component';

describe('TopStateTableComponent', () => {
  let component: TopStateTableComponent;
  let fixture: ComponentFixture<TopStateTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopStateTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopStateTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

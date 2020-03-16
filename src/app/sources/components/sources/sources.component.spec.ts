import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SourcesComponent } from './cases.component';

describe('SourcesComponent', () => {
  let component: SourcesComponent;
  let fixture: ComponentFixture<SourcesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SourcesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GazetteComponent } from './gazette.component';

describe('GazetteComponent', () => {
  let component: GazetteComponent;
  let fixture: ComponentFixture<GazetteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GazetteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GazetteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

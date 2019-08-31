import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLevel1Component } from './admin-level1.component';

describe('AdminLevel1Component', () => {
  let component: AdminLevel1Component;
  let fixture: ComponentFixture<AdminLevel1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminLevel1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminLevel1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

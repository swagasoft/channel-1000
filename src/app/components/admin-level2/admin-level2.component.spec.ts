import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLevel2Component } from './admin-level2.component';

describe('AdminLevel2Component', () => {
  let component: AdminLevel2Component;
  let fixture: ComponentFixture<AdminLevel2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminLevel2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminLevel2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

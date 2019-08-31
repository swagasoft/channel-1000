import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLevel4Component } from './admin-level4.component';

describe('AdminLevel4Component', () => {
  let component: AdminLevel4Component;
  let fixture: ComponentFixture<AdminLevel4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminLevel4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminLevel4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLevel3Component } from './admin-level3.component';

describe('AdminLevel3Component', () => {
  let component: AdminLevel3Component;
  let fixture: ComponentFixture<AdminLevel3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminLevel3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminLevel3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

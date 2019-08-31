import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminInactiveComponent } from './admin-inactive.component';

describe('AdminInactiveComponent', () => {
  let component: AdminInactiveComponent;
  let fixture: ComponentFixture<AdminInactiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminInactiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminInactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavMobileAdminComponent } from './nav-mobile-admin.component';

describe('NavMobileAdminComponent', () => {
  let component: NavMobileAdminComponent;
  let fixture: ComponentFixture<NavMobileAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavMobileAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavMobileAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

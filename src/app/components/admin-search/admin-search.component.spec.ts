import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAccountComponent } from './admin-search.component';

describe('AdminSearchComponent', () => {
  let component: AdminAccountComponent;
  let fixture: ComponentFixture<AdminAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

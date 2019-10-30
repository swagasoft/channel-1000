import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserReferalComponent } from './user-referal.component';

describe('UserReferalComponent', () => {
  let component: UserReferalComponent;
  let fixture: ComponentFixture<UserReferalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserReferalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserReferalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

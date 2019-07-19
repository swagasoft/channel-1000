import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTrasanctionsComponent } from './user-trasanctions.component';

describe('UserTrasanctionsComponent', () => {
  let component: UserTrasanctionsComponent;
  let fixture: ComponentFixture<UserTrasanctionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserTrasanctionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTrasanctionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferandearnComponent } from './referandearn.component';

describe('ReferandearnComponent', () => {
  let component: ReferandearnComponent;
  let fixture: ComponentFixture<ReferandearnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferandearnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferandearnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualPaymentComponent } from './manual-payment.component';

describe('ManualPaymentComponent', () => {
  let component: ManualPaymentComponent;
  let fixture: ComponentFixture<ManualPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManualPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManualPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

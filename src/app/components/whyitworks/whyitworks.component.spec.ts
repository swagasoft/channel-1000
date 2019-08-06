import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhyitworksComponent } from './whyitworks.component';

describe('WhyitworksComponent', () => {
  let component: WhyitworksComponent;
  let fixture: ComponentFixture<WhyitworksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhyitworksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhyitworksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

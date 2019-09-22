import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContinueWithOtpComponent } from './continue-with-otp.component';

describe('ContinueWithOtpComponent', () => {
  let component: ContinueWithOtpComponent;
  let fixture: ComponentFixture<ContinueWithOtpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContinueWithOtpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContinueWithOtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

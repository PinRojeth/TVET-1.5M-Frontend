import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceSubmitPaymentDialogComponent } from './attendance-submit-payment-dialog.component';

describe('AttendanceSubmitPaymentDialogComponent', () => {
  let component: AttendanceSubmitPaymentDialogComponent;
  let fixture: ComponentFixture<AttendanceSubmitPaymentDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AttendanceSubmitPaymentDialogComponent]
    });
    fixture = TestBed.createComponent(AttendanceSubmitPaymentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

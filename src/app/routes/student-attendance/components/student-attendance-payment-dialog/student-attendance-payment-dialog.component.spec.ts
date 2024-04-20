import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAttendancePaymentDialogComponent } from './student-attendance-payment-dialog.component';

describe('StudentAttendancePaymentDialogComponent', () => {
  let component: StudentAttendancePaymentDialogComponent;
  let fixture: ComponentFixture<StudentAttendancePaymentDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentAttendancePaymentDialogComponent]
    });
    fixture = TestBed.createComponent(StudentAttendancePaymentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

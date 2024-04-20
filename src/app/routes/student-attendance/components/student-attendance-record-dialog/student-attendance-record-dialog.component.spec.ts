import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAttendanceRecordDialogComponent } from './student-attendance-record-dialog.component';

describe('StudentAttendanceRecordDialogComponent', () => {
  let component: StudentAttendanceRecordDialogComponent;
  let fixture: ComponentFixture<StudentAttendanceRecordDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentAttendanceRecordDialogComponent]
    });
    fixture = TestBed.createComponent(StudentAttendanceRecordDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

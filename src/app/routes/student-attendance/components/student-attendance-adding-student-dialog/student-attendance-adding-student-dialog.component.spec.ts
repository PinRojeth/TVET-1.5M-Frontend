import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAttendanceAddingStudentDialogComponent } from './student-attendance-adding-student-dialog.component';

describe('StudentAttendanceAddingStudentDialogComponent', () => {
  let component: StudentAttendanceAddingStudentDialogComponent;
  let fixture: ComponentFixture<StudentAttendanceAddingStudentDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentAttendanceAddingStudentDialogComponent]
    });
    fixture = TestBed.createComponent(StudentAttendanceAddingStudentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceSubmitAddingStudentDialogComponent } from './attendance-submit-adding-student-dialog.component';

describe('AttendanceSubmitAddingStudentDialogComponent', () => {
  let component: AttendanceSubmitAddingStudentDialogComponent;
  let fixture: ComponentFixture<AttendanceSubmitAddingStudentDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AttendanceSubmitAddingStudentDialogComponent]
    });
    fixture = TestBed.createComponent(AttendanceSubmitAddingStudentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

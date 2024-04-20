import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentFinishAttendanceCreatingComponent } from './student-finish-attendance-creating.component';

describe('StudentFinishAttendanceCreatingComponent', () => {
  let component: StudentFinishAttendanceCreatingComponent;
  let fixture: ComponentFixture<StudentFinishAttendanceCreatingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentFinishAttendanceCreatingComponent]
    });
    fixture = TestBed.createComponent(StudentFinishAttendanceCreatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

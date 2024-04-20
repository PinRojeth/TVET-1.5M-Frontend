import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentFinishAttendanceComponent } from './student-finish-attendance.component';

describe('StudentFinishAttendanceComponent', () => {
  let component: StudentFinishAttendanceComponent;
  let fixture: ComponentFixture<StudentFinishAttendanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentFinishAttendanceComponent]
    });
    fixture = TestBed.createComponent(StudentFinishAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

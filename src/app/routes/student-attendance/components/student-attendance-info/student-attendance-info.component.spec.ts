import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAttendanceInfoComponent } from './student-attendance-info.component';

describe('StudentAttendanceInfoComponent', () => {
  let component: StudentAttendanceInfoComponent;
  let fixture: ComponentFixture<StudentAttendanceInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentAttendanceInfoComponent]
    });
    fixture = TestBed.createComponent(StudentAttendanceInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

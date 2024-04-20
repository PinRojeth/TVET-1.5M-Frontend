import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAttendanceCrudComponent } from './student-attendance-crud.component';

describe('StudentAttendanceCrudComponent', () => {
  let component: StudentAttendanceCrudComponent;
  let fixture: ComponentFixture<StudentAttendanceCrudComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentAttendanceCrudComponent]
    });
    fixture = TestBed.createComponent(StudentAttendanceCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

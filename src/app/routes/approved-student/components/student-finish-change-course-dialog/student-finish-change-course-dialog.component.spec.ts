import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentFinishChangeCourseDialogComponent } from './student-finish-change-course-dialog.component';

describe('StudentFinishChangeCourseDialogComponent', () => {
  let component: StudentFinishChangeCourseDialogComponent;
  let fixture: ComponentFixture<StudentFinishChangeCourseDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentFinishChangeCourseDialogComponent]
    });
    fixture = TestBed.createComponent(StudentFinishChangeCourseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

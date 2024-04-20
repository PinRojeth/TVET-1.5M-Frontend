import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentRequestsBySchoolComponent } from './student-requests-by-school.component';

describe('StudentRequestsBySchoolComponent', () => {
  let component: StudentRequestsBySchoolComponent;
  let fixture: ComponentFixture<StudentRequestsBySchoolComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentRequestsBySchoolComponent]
    });
    fixture = TestBed.createComponent(StudentRequestsBySchoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

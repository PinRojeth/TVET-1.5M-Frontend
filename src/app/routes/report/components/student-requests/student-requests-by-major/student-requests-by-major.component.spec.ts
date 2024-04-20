import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentRequestsByMajorComponent } from './student-requests-by-major.component';

describe('StudentRequestsByMajorComponent', () => {
  let component: StudentRequestsByMajorComponent;
  let fixture: ComponentFixture<StudentRequestsByMajorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentRequestsByMajorComponent]
    });
    fixture = TestBed.createComponent(StudentRequestsByMajorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

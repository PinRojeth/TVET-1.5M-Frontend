import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentVerifyTimelineComponent } from './student-verify-timeline.component';

describe('StudentVerifyTimelineComponent', () => {
  let component: StudentVerifyTimelineComponent;
  let fixture: ComponentFixture<StudentVerifyTimelineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentVerifyTimelineComponent]
    });
    fixture = TestBed.createComponent(StudentVerifyTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

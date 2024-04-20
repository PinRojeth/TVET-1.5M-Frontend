import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentFinishTimelineComponent } from './student-finish-timeline.component';

describe('StudentFinishTimelineComponent', () => {
  let component: StudentFinishTimelineComponent;
  let fixture: ComponentFixture<StudentFinishTimelineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentFinishTimelineComponent]
    });
    fixture = TestBed.createComponent(StudentFinishTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportCourseComponent } from './report-course.component';

describe('ReportCourseComponent', () => {
  let component: ReportCourseComponent;
  let fixture: ComponentFixture<ReportCourseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportCourseComponent]
    });
    fixture = TestBed.createComponent(ReportCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentRequestsReportComponent } from './student-requests-report.component';

describe('StudentRequestsReportComponent', () => {
  let component: StudentRequestsReportComponent;
  let fixture: ComponentFixture<StudentRequestsReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentRequestsReportComponent]
    });
    fixture = TestBed.createComponent(StudentRequestsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

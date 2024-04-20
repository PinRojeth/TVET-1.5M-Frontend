import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveStudentReportComponent } from './approve-student-report.component';

describe('ApproveStudentReportComponent', () => {
  let component: ApproveStudentReportComponent;
  let fixture: ComponentFixture<ApproveStudentReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApproveStudentReportComponent]
    });
    fixture = TestBed.createComponent(ApproveStudentReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportApprovalMajorComponent } from './report-approval-major.component';

describe('ReportApprovalMajorComponent', () => {
  let component: ReportApprovalMajorComponent;
  let fixture: ComponentFixture<ReportApprovalMajorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportApprovalMajorComponent]
    });
    fixture = TestBed.createComponent(ReportApprovalMajorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

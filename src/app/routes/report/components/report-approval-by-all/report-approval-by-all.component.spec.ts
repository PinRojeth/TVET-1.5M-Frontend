import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportApprovalByAllComponent } from './report-approval-by-all.component';

describe('ReportApprovalByAllComponent', () => {
  let component: ReportApprovalByAllComponent;
  let fixture: ComponentFixture<ReportApprovalByAllComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportApprovalByAllComponent]
    });
    fixture = TestBed.createComponent(ReportApprovalByAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

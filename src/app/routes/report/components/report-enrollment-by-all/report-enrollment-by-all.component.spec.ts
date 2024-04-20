import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportEnrollmentByAllComponent } from './report-enrollment-by-all.component';

describe('ReportEnrollmentByAllComponent', () => {
  let component: ReportEnrollmentByAllComponent;
  let fixture: ComponentFixture<ReportEnrollmentByAllComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportEnrollmentByAllComponent]
    });
    fixture = TestBed.createComponent(ReportEnrollmentByAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

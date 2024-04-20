import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportEnrollmentMajorComponent } from './report-enrollment-major.component';

describe('ReportEnrollmentMajorComponent', () => {
  let component: ReportEnrollmentMajorComponent;
  let fixture: ComponentFixture<ReportEnrollmentMajorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportEnrollmentMajorComponent]
    });
    fixture = TestBed.createComponent(ReportEnrollmentMajorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

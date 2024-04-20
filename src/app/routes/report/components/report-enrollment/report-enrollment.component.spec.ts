import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportEnrollmentComponent } from './report-enrollment.component';

describe('ReportEnrollmentComponent', () => {
  let component: ReportEnrollmentComponent;
  let fixture: ComponentFixture<ReportEnrollmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportEnrollmentComponent]
    });
    fixture = TestBed.createComponent(ReportEnrollmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

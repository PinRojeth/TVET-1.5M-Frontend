import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportStatusByMajorComponent } from './report-status-by-major.component';

describe('ReportStatusByMajorComponent', () => {
  let component: ReportStatusByMajorComponent;
  let fixture: ComponentFixture<ReportStatusByMajorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportStatusByMajorComponent]
    });
    fixture = TestBed.createComponent(ReportStatusByMajorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

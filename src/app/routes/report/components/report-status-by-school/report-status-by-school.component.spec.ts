import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportStatusBySchoolComponent } from './report-status-by-school.component';

describe('ReportStatusBySchoolComponent', () => {
  let component: ReportStatusBySchoolComponent;
  let fixture: ComponentFixture<ReportStatusBySchoolComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportStatusBySchoolComponent]
    });
    fixture = TestBed.createComponent(ReportStatusBySchoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

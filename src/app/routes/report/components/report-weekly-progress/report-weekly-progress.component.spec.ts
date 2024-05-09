import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportWeeklyProgressComponent } from './report-weekly-progress.component';

describe('ReportWeeklyProgressComponent', () => {
  let component: ReportWeeklyProgressComponent;
  let fixture: ComponentFixture<ReportWeeklyProgressComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportWeeklyProgressComponent]
    });
    fixture = TestBed.createComponent(ReportWeeklyProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

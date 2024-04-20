import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralDepartmentVerifyTimelineComponent } from './general-department-verify-timeline.component';

describe('GeneralDepartmentVerifyTimelineComponent', () => {
  let component: GeneralDepartmentVerifyTimelineComponent;
  let fixture: ComponentFixture<GeneralDepartmentVerifyTimelineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GeneralDepartmentVerifyTimelineComponent]
    });
    fixture = TestBed.createComponent(GeneralDepartmentVerifyTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceSubmitInfoComponent } from './attendance-submit-info.component';

describe('AttendanceSubmitInfoComponent', () => {
  let component: AttendanceSubmitInfoComponent;
  let fixture: ComponentFixture<AttendanceSubmitInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AttendanceSubmitInfoComponent]
    });
    fixture = TestBed.createComponent(AttendanceSubmitInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

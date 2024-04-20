import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceRecordComponent } from './attendance-record.component';

describe('AttendanceRecordComponent', () => {
  let component: AttendanceRecordComponent;
  let fixture: ComponentFixture<AttendanceRecordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AttendanceRecordComponent]
    });
    fixture = TestBed.createComponent(AttendanceRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

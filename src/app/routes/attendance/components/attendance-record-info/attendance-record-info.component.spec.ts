import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceRecordInfoComponent } from './attendance-record-info.component';

describe('AttendanceRecordInfoComponent', () => {
  let component: AttendanceRecordInfoComponent;
  let fixture: ComponentFixture<AttendanceRecordInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AttendanceRecordInfoComponent]
    });
    fixture = TestBed.createComponent(AttendanceRecordInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

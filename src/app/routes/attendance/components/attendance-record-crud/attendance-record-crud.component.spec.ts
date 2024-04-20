import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceRecordCrudComponent } from './attendance-record-crud.component';

describe('AttendanceRecordCrudComponent', () => {
  let component: AttendanceRecordCrudComponent;
  let fixture: ComponentFixture<AttendanceRecordCrudComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AttendanceRecordCrudComponent]
    });
    fixture = TestBed.createComponent(AttendanceRecordCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

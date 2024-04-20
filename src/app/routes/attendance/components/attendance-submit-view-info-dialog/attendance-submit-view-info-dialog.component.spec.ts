import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceSubmitViewInfoDialogComponent } from './attendance-submit-view-info-dialog.component';

describe('AttendanceSubmitViewInfoDialogComponent', () => {
  let component: AttendanceSubmitViewInfoDialogComponent;
  let fixture: ComponentFixture<AttendanceSubmitViewInfoDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AttendanceSubmitViewInfoDialogComponent]
    });
    fixture = TestBed.createComponent(AttendanceSubmitViewInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

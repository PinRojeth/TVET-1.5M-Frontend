import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentVerifyDetailRejectDialogComponent } from './student-verify-detail-reject-dialog.component';

describe('StudentVerifyDetailRejectDialogComponent', () => {
  let component: StudentVerifyDetailRejectDialogComponent;
  let fixture: ComponentFixture<StudentVerifyDetailRejectDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentVerifyDetailRejectDialogComponent]
    });
    fixture = TestBed.createComponent(StudentVerifyDetailRejectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

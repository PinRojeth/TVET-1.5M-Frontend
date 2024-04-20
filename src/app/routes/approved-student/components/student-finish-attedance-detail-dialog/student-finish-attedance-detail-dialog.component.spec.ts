import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentFinishAttedanceDetailDialogComponent } from './student-finish-attedance-detail-dialog.component';

describe('StudentFinishAttedanceDetailDialogComponent', () => {
  let component: StudentFinishAttedanceDetailDialogComponent;
  let fixture: ComponentFixture<StudentFinishAttedanceDetailDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentFinishAttedanceDetailDialogComponent]
    });
    fixture = TestBed.createComponent(StudentFinishAttedanceDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentRequestQuitDialogComponent } from './student-request-quit-dialog.component';

describe('StudentRequestQuitDialogComponent', () => {
  let component: StudentRequestQuitDialogComponent;
  let fixture: ComponentFixture<StudentRequestQuitDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentRequestQuitDialogComponent]
    });
    fixture = TestBed.createComponent(StudentRequestQuitDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

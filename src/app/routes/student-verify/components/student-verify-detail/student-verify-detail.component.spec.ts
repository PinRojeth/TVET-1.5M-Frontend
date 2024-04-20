import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentVerifyDetailComponent } from './student-verify-detail.component';

describe('StudentVerifyDetailComponent', () => {
  let component: StudentVerifyDetailComponent;
  let fixture: ComponentFixture<StudentVerifyDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentVerifyDetailComponent]
    });
    fixture = TestBed.createComponent(StudentVerifyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentVerifyComponent } from './student-verify.component';

describe('StudentVerifyComponent', () => {
  let component: StudentVerifyComponent;
  let fixture: ComponentFixture<StudentVerifyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentVerifyComponent]
    });
    fixture = TestBed.createComponent(StudentVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

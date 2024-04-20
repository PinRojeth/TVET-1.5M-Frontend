import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentVerifyTabComponent } from './student-verify-tab.component';

describe('StudentVerifyTabComponent', () => {
  let component: StudentVerifyTabComponent;
  let fixture: ComponentFixture<StudentVerifyTabComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentVerifyTabComponent]
    });
    fixture = TestBed.createComponent(StudentVerifyTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

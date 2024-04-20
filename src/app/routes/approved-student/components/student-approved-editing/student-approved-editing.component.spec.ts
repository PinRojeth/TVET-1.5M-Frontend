import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentApprovedEditingComponent } from './student-approved-editing.component';

describe('StudentApprovedEditingComponent', () => {
  let component: StudentApprovedEditingComponent;
  let fixture: ComponentFixture<StudentApprovedEditingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentApprovedEditingComponent]
    });
    fixture = TestBed.createComponent(StudentApprovedEditingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

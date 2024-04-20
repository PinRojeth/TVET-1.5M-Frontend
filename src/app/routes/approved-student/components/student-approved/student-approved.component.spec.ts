import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentApprovedComponent } from './student-approved.component';

describe('StudentApprovedComponent', () => {
  let component: StudentApprovedComponent;
  let fixture: ComponentFixture<StudentApprovedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentApprovedComponent]
    });
    fixture = TestBed.createComponent(StudentApprovedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentRequestEditingComponent } from './student-request-editing.component';

describe('StudentRequestEditingComponent', () => {
  let component: StudentRequestEditingComponent;
  let fixture: ComponentFixture<StudentRequestEditingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentRequestEditingComponent]
    });
    fixture = TestBed.createComponent(StudentRequestEditingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

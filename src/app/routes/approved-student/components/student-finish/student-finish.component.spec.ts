import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentFinishComponent } from './student-finish.component';

describe('StudentFinishComponent', () => {
  let component: StudentFinishComponent;
  let fixture: ComponentFixture<StudentFinishComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentFinishComponent]
    });
    fixture = TestBed.createComponent(StudentFinishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

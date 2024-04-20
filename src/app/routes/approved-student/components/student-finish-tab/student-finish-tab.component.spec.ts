import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentFinishTabComponent } from './student-finish-tab.component';

describe('StudentFinishTabComponent', () => {
  let component: StudentFinishTabComponent;
  let fixture: ComponentFixture<StudentFinishTabComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentFinishTabComponent]
    });
    fixture = TestBed.createComponent(StudentFinishTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

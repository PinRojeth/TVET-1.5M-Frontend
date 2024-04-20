import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentFinishDetailComponent } from './student-finish-detail.component';

describe('StudentFinishDetailComponent', () => {
  let component: StudentFinishDetailComponent;
  let fixture: ComponentFixture<StudentFinishDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentFinishDetailComponent]
    });
    fixture = TestBed.createComponent(StudentFinishDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

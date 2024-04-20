import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceSubmitCrudComponent } from './attendance-submit-crud.component';

describe('AttendanceSubmitCrudComponent', () => {
  let component: AttendanceSubmitCrudComponent;
  let fixture: ComponentFixture<AttendanceSubmitCrudComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AttendanceSubmitCrudComponent]
    });
    fixture = TestBed.createComponent(AttendanceSubmitCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

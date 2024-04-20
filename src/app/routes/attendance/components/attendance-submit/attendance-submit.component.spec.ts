import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceSubmitComponent } from './attendance-submit.component';

describe('AttendanceSubmitComponent', () => {
  let component: AttendanceSubmitComponent;
  let fixture: ComponentFixture<AttendanceSubmitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AttendanceSubmitComponent]
    });
    fixture = TestBed.createComponent(AttendanceSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

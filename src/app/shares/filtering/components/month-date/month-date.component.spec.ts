import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthDateComponent } from './month-date.component';

describe('MonthDateComponent', () => {
  let component: MonthDateComponent;
  let fixture: ComponentFixture<MonthDateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonthDateComponent]
    });
    fixture = TestBed.createComponent(MonthDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

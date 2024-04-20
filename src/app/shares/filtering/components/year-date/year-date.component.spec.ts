import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YearDateComponent } from './year-date.component';

describe('YearDateComponent', () => {
  let component: YearDateComponent;
  let fixture: ComponentFixture<YearDateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [YearDateComponent]
    });
    fixture = TestBed.createComponent(YearDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

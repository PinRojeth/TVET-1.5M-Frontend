import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectedInfoComponent } from './rejected-info.component';

describe('RejectedInfoComponent', () => {
  let component: RejectedInfoComponent;
  let fixture: ComponentFixture<RejectedInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RejectedInfoComponent]
    });
    fixture = TestBed.createComponent(RejectedInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

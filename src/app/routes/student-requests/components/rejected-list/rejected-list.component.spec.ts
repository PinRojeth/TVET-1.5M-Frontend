import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectedListComponent } from './rejected-list.component';

describe('RejectedListComponent', () => {
  let component: RejectedListComponent;
  let fixture: ComponentFixture<RejectedListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RejectedListComponent]
    });
    fixture = TestBed.createComponent(RejectedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

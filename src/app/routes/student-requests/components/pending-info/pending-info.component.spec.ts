import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingInfoComponent } from './pending-info.component';

describe('PendingInfoComponent', () => {
  let component: PendingInfoComponent;
  let fixture: ComponentFixture<PendingInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PendingInfoComponent]
    });
    fixture = TestBed.createComponent(PendingInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

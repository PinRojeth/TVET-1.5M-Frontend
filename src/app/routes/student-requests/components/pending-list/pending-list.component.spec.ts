import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingListComponent } from './pending-list.component';

describe('PendingListComponent', () => {
  let component: PendingListComponent;
  let fixture: ComponentFixture<PendingListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PendingListComponent]
    });
    fixture = TestBed.createComponent(PendingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

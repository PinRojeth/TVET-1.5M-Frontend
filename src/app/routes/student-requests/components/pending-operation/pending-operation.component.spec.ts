import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingOperationComponent } from './pending-operation.component';

describe('PendingOperationComponent', () => {
  let component: PendingOperationComponent;
  let fixture: ComponentFixture<PendingOperationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PendingOperationComponent]
    });
    fixture = TestBed.createComponent(PendingOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

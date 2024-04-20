import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePendingComponent } from './create-pending.component';

describe('CreatePendingComponent', () => {
  let component: CreatePendingComponent;
  let fixture: ComponentFixture<CreatePendingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatePendingComponent]
    });
    fixture = TestBed.createComponent(CreatePendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

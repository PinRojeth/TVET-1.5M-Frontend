import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoorIdInputComponent } from './poor-id-input.component';

describe('PoorIdInputComponent', () => {
  let component: PoorIdInputComponent;
  let fixture: ComponentFixture<PoorIdInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PoorIdInputComponent]
    });
    fixture = TestBed.createComponent(PoorIdInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

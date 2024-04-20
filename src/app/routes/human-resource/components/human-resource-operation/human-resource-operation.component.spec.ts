import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HumanResourceOperationComponent } from './human-resource-operation.component';

describe('HumanResourceOperationComponent', () => {
  let component: HumanResourceOperationComponent;
  let fixture: ComponentFixture<HumanResourceOperationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HumanResourceOperationComponent]
    });
    fixture = TestBed.createComponent(HumanResourceOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

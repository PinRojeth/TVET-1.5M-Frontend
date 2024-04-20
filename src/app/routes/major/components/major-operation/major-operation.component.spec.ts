import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MajorOperationComponent } from './major-operation.component';

describe('MajorOperationComponent', () => {
  let component: MajorOperationComponent;
  let fixture: ComponentFixture<MajorOperationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MajorOperationComponent]
    });
    fixture = TestBed.createComponent(MajorOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

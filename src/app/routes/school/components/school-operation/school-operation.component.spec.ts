import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolOperationComponent } from './school-operation.component';

describe('SchoolOperationComponent', () => {
  let component: SchoolOperationComponent;
  let fixture: ComponentFixture<SchoolOperationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SchoolOperationComponent]
    });
    fixture = TestBed.createComponent(SchoolOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

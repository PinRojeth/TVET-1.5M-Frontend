import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableStudentFemaleComponent } from './table-student-female.component';

describe('TableStudentFemaleComponent', () => {
  let component: TableStudentFemaleComponent;
  let fixture: ComponentFixture<TableStudentFemaleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableStudentFemaleComponent]
    });
    fixture = TestBed.createComponent(TableStudentFemaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

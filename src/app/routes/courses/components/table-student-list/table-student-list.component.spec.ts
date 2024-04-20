import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableStudentListComponent } from './table-student-list.component';

describe('TableStudentListComponent', () => {
  let component: TableStudentListComponent;
  let fixture: ComponentFixture<TableStudentListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableStudentListComponent]
    });
    fixture = TestBed.createComponent(TableStudentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

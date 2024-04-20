import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Params } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { DESTROYER$ } from 'src/app/helpers/unsubscribe';
import { BaseDatatable } from 'src/app/models/datatables/base.datatable';
import { Student } from 'src/app/models/student';
import { TableColumn } from 'src/app/models/table-column';
import { StudentAttendanceService } from 'src/app/services/student-attendance.service';
import { Pagination } from 'src/app/shares/pagination/pagination';

@Component({
  selector: 'app-student-attendance-adding-student-dialog',
  templateUrl: './student-attendance-adding-student-dialog.component.html',
  styleUrls: ['./student-attendance-adding-student-dialog.component.scss']
})
export class StudentAttendanceAddingStudentDialogComponent {
  private readonly destroyer$ = DESTROYER$();

  private readonly dialogRef = inject(MatDialogRef<StudentAttendanceAddingStudentDialogComponent>);
  private readonly studentAttendanceService = inject(StudentAttendanceService);

  tableColumns: TableColumn[] = [
    {
      name: 'table.name',
      dataKey: 'name',
      custom: true
    },
    {
      name: 'table.gender',
      dataKey: 'gender',
      custom: true
    },
    {
      name: 'table.poor_id',
      dataKey: 'poor_id',
      custom: true
    },
    {
      name: 'វគ្គសិក្សា',
      dataKey: 'courses',
      custom: true
    },
    {
      name: 'table.action',
      dataKey: 'action',
      custom: true
    }
  ];
  tableData: BaseDatatable<Student>;
  selectedStudent: Student[] = [];

  filterData$: Observable<unknown> = this.studentAttendanceService.filterData();

  filterParams: Params = {};
  params: Pagination = {
    limit: 10,
    page: 1,
    search: ''
  };

  requestUrl: string = this.studentAttendanceService.path + '/student';

  isLoaded: boolean;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Student[]) {
    this.onLoad();
  }

  onLoad(pagination?: Pagination) {
    const params = { ...this.params, ...pagination, ...this.filterParams };
    this.studentAttendanceService
      .getStudentList(params)
      .pipe(
        map(map => {
          //get all selected student from parent table data.
          if (this.data?.length > 0 && !this.isLoaded) {
            this.selectedStudent = this.data.filter(fil => !!fil?.selected);
            this.isLoaded = true;
          }

          if (this.selectedStudent?.length > 0) {
            for (const item of map.list) {
              if (this.selectedStudent.map(map => map._id).includes(item._id)) {
                item.selected = true;
                item.disabled = this.data.find(value => value._id === item._id)?.disabled;
              }
            }
          }

          return map;
        }),
        takeUntil(this.destroyer$)
      )
      .subscribe({
        next: res => {
          this.tableData = res;
        }
      });
  }

  onAdd(student: Student): void {
    student.selected = true;
    this.selectedStudent.push(student);
  }

  onRemove(student: Student): void {
    student.selected = false;
    this.selectedStudent = this.selectedStudent.filter(fil => fil._id !== student._id);
  }

  onSubmit(): void {
    if (this.selectedStudent.some(fil => !!fil?.selected)) {
      const VALID_DATA: Student[] = this.selectedStudent.filter(fil => !!fil?.selected);
      this.dialogRef.close(VALID_DATA);
    }
  }

  goTo(pagination: Pagination): void {
    this.onLoad(pagination);
  }

  //TODO: searching functions
  timer: ReturnType<typeof setTimeout>;
  onSearch(value: string) {
    this.params.search = value;
    this.startSearch();
  }
  startSearch() {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.onLoad(), 500);
  }

  //Filtering Data Functions
  setParams(filterParams: Params): void {
    if (Object.keys(filterParams).length < 1) this.filterParams = [];
    else this.filterParams = filterParams;
    this.startSearch();
  }
}

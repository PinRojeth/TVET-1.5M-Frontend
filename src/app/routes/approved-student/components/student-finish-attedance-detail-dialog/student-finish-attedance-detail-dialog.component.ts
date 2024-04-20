import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { takeUntil } from 'rxjs';
import { DESTROYER$ } from 'src/app/helpers/unsubscribe';
import { BaseDatatable } from 'src/app/models/datatables/base.datatable';
import { Student, StudentAttendance } from 'src/app/models/student';
import { TableColumn } from 'src/app/models/table-column';
import { StudentService } from 'src/app/services/student.service';
import { Pagination } from 'src/app/shares/pagination/pagination';

@Component({
  selector: 'app-student-finish-attedance-detail-dialog',
  templateUrl: './student-finish-attedance-detail-dialog.component.html',
  styleUrls: ['./student-finish-attedance-detail-dialog.component.scss']
})
export class StudentFinishAttedanceDetailDialogComponent {
  private readonly destroyer$ = DESTROYER$();

  private readonly studentService = inject(StudentService);

  tableColumns: TableColumn[] = [
    {
      name: 'កាលបរិច្ឆេទ',
      dataKey: 'date',
      custom: true
    },
    {
      name: 'វត្តមាន',
      dataKey: 'attendance',
      custom: true
    }
  ];
  tableData: BaseDatatable<StudentAttendance>;
  selectedStudent: Student[] = [];

  params: Pagination = {
    limit: 0,
    page: 1,
    search: ''
  };

  requestUrl: string;

  isLoaded: boolean;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { students: string; year: number; month: number }) {
    this.onLoad();

    this.requestUrl = `${this.studentService.path}/${this.data.students}/attendance_detail`;
  }

  onLoad(pagination?: Pagination) {
    const params = {
      ...this.params,
      ...pagination,
      year: this.data.year,
      month: this.data.month
    };
    this.studentService
      .getAttendanceDetail(params, this.data.students)
      .pipe(takeUntil(this.destroyer$))
      .subscribe({
        next: res => {
          this.tableData = { ...res, total: 0 };
        }
      });
  }
}

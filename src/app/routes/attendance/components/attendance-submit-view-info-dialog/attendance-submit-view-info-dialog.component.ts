import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { DESTROYER$ } from 'src/app/helpers/unsubscribe';
import { BaseDatatable } from 'src/app/models/datatables/base.datatable';
import { Student } from 'src/app/models/student';
import { TableColumn } from 'src/app/models/table-column';
import { AttendanceService } from 'src/app/services/attendance.service';
import { Pagination } from 'src/app/shares/pagination/pagination';

@Component({
  selector: 'app-attendance-submit-view-info-dialog',
  templateUrl: './attendance-submit-view-info-dialog.component.html',
  styleUrls: ['./attendance-submit-view-info-dialog.component.scss']
})
export class AttendanceSubmitViewInfoDialogComponent {
  private readonly destroyer$ = DESTROYER$();

  private readonly attendanceService = inject(AttendanceService);

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
  tableData: BaseDatatable<Student>;
  selectedStudent: Student[] = [];

  params: Pagination = {
    limit: 0,
    page: 1,
    search: ''
  };

  requestUrl: string = `${this.attendanceService.path}_submit/attendance_detail`;

  isLoaded: boolean;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { students: Student; attendance_submits: string }) {
    this.onLoad();
  }

  onLoad(pagination?: Pagination) {
    const params = {
      ...this.params,
      ...pagination,
      students: this.data.students._id,
      attendance_submits: this.data.attendance_submits
    };
    this.attendanceService
      .getSubmitDetail(params)
      .pipe(takeUntil(this.destroyer$))
      .subscribe({
        next: res => {
          this.tableData = {...res, total: 0};
        }
      });
  }
}

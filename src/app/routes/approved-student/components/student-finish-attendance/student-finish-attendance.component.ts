import { Component, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { pAdmin } from 'src/app/helpers/permission';
import { DESTROYER$ } from 'src/app/helpers/unsubscribe';
import { BaseDatatable } from 'src/app/models/datatables/base.datatable';
import { StudentAttendance } from 'src/app/models/student';
import { TableColumn } from 'src/app/models/table-column';
import { StudentService } from 'src/app/services/student.service';
import { Pagination } from 'src/app/shares/pagination/pagination';
import { StudentFinishAttedanceDetailDialogComponent } from '../student-finish-attedance-detail-dialog/student-finish-attedance-detail-dialog.component';

@Component({
  selector: 'app-student-finish-attendance',
  templateUrl: './student-finish-attendance.component.html',
  styleUrls: ['./student-finish-attendance.component.scss']
})
export class StudentFinishAttendanceComponent implements OnInit {
  private readonly destroyer$ = DESTROYER$();
  private readonly route = inject(ActivatedRoute);
  public readonly translate = inject(TranslateService);
  private readonly studentService = inject(StudentService);
  private readonly dialog = inject(MatDialog);

  pAttendance = pAdmin.studentAttendance;

  studentId: string = this.route.snapshot.params.studentId;
  student: string = this.route.snapshot.params.name;
  requestUrl: string = `${this.studentService.path}/${this.studentId}/attendance`

  params: Pagination = {
    limit: 10,
    page: 1,
    search: ''
  };
  tableColumns: TableColumn[] = [
    {
      name: 'កាលបរិច្ឆេទ',
      dataKey: 'year',
      custom: true,
      isSortable: true
    },
    {
      name: 'មធ្យមភាគវត្តមាន',
      dataKey: 'attendance',
      custom: true
    },
    {
      name: 'សកម្មភាព',
      dataKey: 'action',
      custom: true
    }
  ];
  tableData: BaseDatatable<StudentAttendance>;

  ngOnInit(): void {
    this.onLoad();
  }

  onLoad(pagination?: Pagination): void {
    const params = { ...this.params, ...pagination };
    this.studentService
      .getAttendance(params, this.studentId)
      .pipe(takeUntil(this.destroyer$))
      .subscribe({
        next: res => {
          this.tableData = res;
        }
      });
  }

  onViewDetail(data: StudentAttendance): void {
    this.dialog.open(StudentFinishAttedanceDetailDialogComponent, {
      width: '750px',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      panelClass: 'mat-dialog__padding-none',
      data: { students: this.studentId, year: data.year, month: data.month }
    });
  }

  actionEvent(label: string, payload: StudentAttendance): void {
    if (label === 'view') this.onViewDetail(payload);
  }

  goTo(pagination: Pagination): void {
    this.onLoad(pagination);
  }

  // chosenYearHandler(normalizedYear: Moment, dp: any): void {
  //   const ctrlValue: Moment = this.date.value;
  //   ctrlValue.year(normalizedYear.year());
  //   this.date.setValue(ctrlValue);
  //   this.activeYear = this.date.value.year();
  //   dp.close();

  //   this.onLoad();
  // }

  // nextDate(): void {
  //   const ctrlValue: Moment = this.date.value;
  //   ctrlValue.year(this.date.value.year() + 1);
  //   this.date.setValue(ctrlValue);

  //   this.activeYear = this.date.value.year();
  //   this.onLoad();
  // }

  // previousDate(): void {
  //   const ctrlValue: Moment = this.date.value;
  //   ctrlValue.year(this.date.value.year() - 1);
  //   this.date.setValue(ctrlValue);

  //   this.activeYear = this.date.value.year();
  //   this.onLoad();
  // }
}

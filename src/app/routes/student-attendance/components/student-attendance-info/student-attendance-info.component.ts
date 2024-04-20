import { formatDate } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { pAdmin } from 'src/app/helpers/permission';
import { DESTROYER$ } from 'src/app/helpers/unsubscribe';
import { AttendanceItem, AttendanceStudentRecord } from 'src/app/models/attendance';
import { AddButton } from 'src/app/models/button';
import { AttendanceType } from 'src/app/models/enums/enumConstant';
import { ScholarshipPayment } from 'src/app/models/student';
import { DialogService } from 'src/app/services/dialog.service';
import { LoadingService } from 'src/app/services/loading.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { StudentAttendanceService } from 'src/app/services/student-attendance.service';
import { FullNamePipe } from 'src/app/shares/name/pipes/full-name.pipe';
import { PermissionPipe } from 'src/app/shares/role/pipes/permission.pipe';
import { environment } from 'src/environments/environment';
import { StudentAttendancePaymentDialogComponent } from '../student-attendance-payment-dialog/student-attendance-payment-dialog.component';
import { StudentAttendanceRecordDialogComponent } from '../student-attendance-record-dialog/student-attendance-record-dialog.component';

@Component({
  selector: 'app-student-attendance-info',
  templateUrl: './student-attendance-info.component.html',
  styleUrls: ['./student-attendance-info.component.scss'],
  providers: [FullNamePipe, PermissionPipe]
})
export class StudentAttendanceInfoComponent {
  pStudent = pAdmin.attendanceRecord;
  pPayment = pAdmin.scholarshipPayment;

  private readonly destroyer$ = DESTROYER$();

  readonly loadingService = inject(LoadingService);
  private readonly studentAttendanceService = inject(StudentAttendanceService);
  private readonly route = inject(ActivatedRoute);
  private readonly dialog = inject(MatDialog);
  private readonly namePipe = inject(FullNamePipe);
  private readonly dialogService = inject(DialogService);
  private readonly snackbarService = inject(SnackbarService);
  private readonly permissionPipe = inject(PermissionPipe);
  private readonly router = inject(Router);

  tableDataSource = new MatTableDataSource<AttendanceItem>();
  displayedColumns: string[] = ['position', 'name', 'poor_id', 'present', 'absent', 'permission', 'status', 'action'];
  readonly addButton = (data: AttendanceItem): AddButton[] => {
    return [
      {
        label: 'វត្តមាន',
        svgIcon: 'visibility-color',
        permission: this.permissionPipe.transform([this.pStudent.read])
      },
      {
        label: 'ប្រាក់ឧបត្ថម្ភ',
        svgIcon: 'mat-payment',
        permission: data?.scholarship_payments
          ? this.permissionPipe.transform([this.pPayment.read])
          : this.permissionPipe.transform([this.pPayment.write])
      }
    ];
  };

  dateNow: Date = new Date();

  data: AttendanceStudentRecord;

  attendanceId: string = this.route.snapshot.params?.attendanceId;
  requestUrl: string = `${environment.api_url}${this.studentAttendanceService.path}/${this.attendanceId}`;

  attendanceType: typeof AttendanceType = AttendanceType;

  ngOnInit(): void {
    this.onLoad();
  }

  onLoad(): void {
    this.studentAttendanceService
      .getOne(this.attendanceId)
      .pipe(
        map(map => {
          //mark select to true to note as selected student and format date of attendance
          map.data = map?.data?.map(value => {
            return {
              ...value,
              attendances: value.attendances.map(item => {
                return {
                  attendance_data: item.attendance_data?.map(payload => {
                    return { ...payload, date: this.formattedDate(payload.date) };
                  }),
                  shift_times: item.shift_times['_id'] ?? item.shift_times
                };
              })
            };
          });
          return map;
        }),
        takeUntil(this.destroyer$)
      )
      .subscribe({
        next: res => {
          this.data = res;
          this.tableDataSource = new MatTableDataSource(res.data);
        }
      });
  }

  onClick(label: string, data: AttendanceItem): void {
    if (label === 'វត្តមាន') this.onView(data);
    else if (label === 'ប្រាក់ឧបត្ថម្ភ') this.onCreatePayment(data);
  }

  onView(data: AttendanceItem): void {
    this.dialog.open(StudentAttendanceRecordDialogComponent, {
      width: '1000px',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      panelClass: 'mat-dialog__padding-none',
      data: {
        student: this.namePipe.transform(data.students),
        data: data?.attendances || [],
        activeDate: { year: this.data.year, month: this.data.month },
        shift_times: data?.students?.shift_times,
        disable: true
      }
    });
  }

  onCreatePayment(data: AttendanceItem): void {
    const dialog = this.dialog.open(StudentAttendancePaymentDialogComponent, {
      width: '750px',
      data: { ...this.data, data: data }
    });

    dialog.afterClosed().subscribe(result => {
      if (!!result) {
        //condition on delete scholarship payment
        if (result === 'deleted') this.onLoad();
        else this.createPayment(data?.scholarship_payments?._id ?? null, result);
      }
    });
  }

  createPayment(_id: string, DATA: ScholarshipPayment): void {
    const API_UPDATE: Observable<ScholarshipPayment> = this.studentAttendanceService.updatePayment(_id, DATA);
    const API_CREATE: Observable<ScholarshipPayment> = this.studentAttendanceService.createPayment(this.attendanceId, DATA);
    const API: Observable<ScholarshipPayment> = _id ? API_UPDATE : API_CREATE;
    const MESSAGE: string = _id ? 'edit' : 'add';

    API.pipe(takeUntil(this.destroyer$)).subscribe({
      next: res => {
        this.snackbarService.onShowSnackbar({ message: MESSAGE });
        this.onLoad();
      }
    });
  }

  onDelete(): void {
    this.dialogService
      .onShowDialog({
        title: 'លុបកំណត់ត្រាវត្តមាន',
        message: 'តើអ្នកពិតជាចង់លុបកំណត់ត្រាវត្តមាននេះមែនទេ?'
      })
      .afterClosed()
      .subscribe(res => {
        if (res === 'confirm') {
          this.studentAttendanceService
            .deleteAttendance(this.attendanceId)
            .pipe(takeUntil(this.destroyer$))
            .subscribe({
              next: res => {
                this.snackbarService.onShowSnackbar({ message: 'delete' });
                this.router.navigate(['../..'], { relativeTo: this.route });
              }
            });
        }
      });
  }

  formattedDate(date: string | Date): string {
    return formatDate(new Date(date), 'yyyy-MM-dd', 'en-US');
  }

  trackByFn(index: number, item: any): void {
    return item?._id ?? index ?? item?.name ?? item;
  }
}

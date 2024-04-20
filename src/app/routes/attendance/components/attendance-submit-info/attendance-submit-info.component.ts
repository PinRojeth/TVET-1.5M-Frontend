import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, takeUntil } from 'rxjs';
import { pAdmin } from 'src/app/helpers/permission';
import { DESTROYER$ } from 'src/app/helpers/unsubscribe';
import { Attendance } from 'src/app/models/attendance';
import { AddButton } from 'src/app/models/button';
import { ScholarshipPayment, Student } from 'src/app/models/student';
import { AttendanceService } from 'src/app/services/attendance.service';
import { DialogService } from 'src/app/services/dialog.service';
import { LoadingService } from 'src/app/services/loading.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { StudentAttendanceService } from 'src/app/services/student-attendance.service';
import { PermissionPipe } from 'src/app/shares/role/pipes/permission.pipe';
import { environment } from 'src/environments/environment';
import { AttendanceSubmitPaymentDialogComponent } from '../attendance-submit-payment-dialog/attendance-submit-payment-dialog.component';
import { AttendanceSubmitViewInfoDialogComponent } from '../attendance-submit-view-info-dialog/attendance-submit-view-info-dialog.component';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-attendance-submit-info',
  templateUrl: './attendance-submit-info.component.html',
  styleUrls: ['./attendance-submit-info.component.scss'],
  providers: [PermissionPipe]
})
export class AttendanceSubmitInfoComponent {
  private readonly destroyer$ = DESTROYER$();

  readonly loadingService = inject(LoadingService);
  private readonly attendanceService = inject(AttendanceService);
  private readonly route = inject(ActivatedRoute);
  private readonly permissionPipe = inject(PermissionPipe);
  private readonly dialog = inject(MatDialog);
  private readonly dialogService = inject(DialogService);
  private readonly snackbarService = inject(SnackbarService);
  private readonly router = inject(Router);
  private readonly studentAttendanceService = inject(StudentAttendanceService);

  pStudent = pAdmin.attendanceSubmit;
  pPayment = pAdmin.scholarshipPayment;
  att_sub_obj;
  studentListsArrange = [];

  tableDataSource = new MatTableDataSource<Student>();
  displayedColumns: string[] = ['position', 'name', 'poor_id', 'courses', 'attendance', 'status', 'action'];
  readonly addButton = (data: Student): AddButton[] => {
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

  data: Attendance;

  attendanceId: string = this.route.snapshot.params?.attendance;
  requestUrl: string = `${environment.api_url}${this.attendanceService.path}_submit/${this.attendanceId}`;

  ngOnInit(): void {
    this.onLoad();
  }

  onLoad(): void {
    this.attendanceService
      .getOneSubmit(this.attendanceId)
      .pipe(takeUntil(this.destroyer$))
      .subscribe({
        next: res => {
          this.tableDataSource = new MatTableDataSource(res.students);
          this.data = res;
          this.att_sub_obj = res;
        }
      });
  }

  onView(student: Student): void {
    this.dialog.open(AttendanceSubmitViewInfoDialogComponent, {
      width: '750px',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      panelClass: 'mat-dialog__padding-none',
      data: { students: student, attendance_submits: this.attendanceId }
    });
  }

  onClick(label: string, data: Student): void {
    if (label === 'វត្តមាន') this.onView(data);
    else if (label === 'ប្រាក់ឧបត្ថម្ភ') this.onCreatePayment(data);
  }

  onDelete(): void {
    this.dialogService
      .onShowDialog({
        title: 'លុបសំណើកំណត់ត្រាវត្តមាន',
        message: 'តើអ្នកពិតជាចង់លុបសំណើកំណត់ត្រាវត្តមាននេះមែនទេ?'
      })
      .afterClosed()
      .subscribe(res => {
        if (res === 'confirm') {
          this.attendanceService
            .deleteSubmit(this.attendanceId)
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

  onCreatePayment(data: Student): void {
    const dialog = this.dialog.open(AttendanceSubmitPaymentDialogComponent, {
      width: '750px',
      data: { ...this.data, student: data }
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
    const API_CREATE: Observable<ScholarshipPayment> = this.studentAttendanceService.createPayment(
      this.attendanceId,
      DATA
    );
    const API: Observable<ScholarshipPayment> = _id ? API_UPDATE : API_CREATE;
    const MESSAGE: string = _id ? 'edit' : 'add';

    API.pipe(takeUntil(this.destroyer$)).subscribe({
      next: res => {
        this.snackbarService.onShowSnackbar({ message: MESSAGE });
        this.onLoad();
      }
    });
  }

  onExportFile(): void {

    //Arrange data
    for (let student of this.att_sub_obj.students) {
      this.studentListsArrange.push({
        id: student._id,
        first_name: student.first_name,
        last_name: student.last_name,
        gender: student.gender,
        phone: student.phone_number,
        school: this.att_sub_obj.schools.name,
        course: student.courses.apply_majors.name,
        shift: student.courses.shifts,
        poor_id: student.poor_id,
        poverty_status: student.type_poverty_status,
        average_attendance: student.average_attendance,
        free: student.courses.fee,
        status:
          student.scholarship_payments?.status == 1
            ? 'បានអនុម័ត'
            : student.scholarship_payments?.status == -3
            ? 'បដិសេធ'
            : ''
      });
    }

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.studentListsArrange);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, 'file.xlsx');
  }
}

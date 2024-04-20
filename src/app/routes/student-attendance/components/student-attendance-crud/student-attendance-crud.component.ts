import { Component, inject, OnInit } from '@angular/core';
import { ConfirmDialogComponent } from 'src/app/shares/confirm-dialog/components/confirm-dialog/confirm-dialog.component';
import { StudentAttendanceAddingStudentDialogComponent } from '../student-attendance-adding-student-dialog/student-attendance-adding-student-dialog.component';
import { StudentAttendanceRecordDialogComponent } from '../student-attendance-record-dialog/student-attendance-record-dialog.component';

import { formatDate, Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import moment, { Moment } from 'moment';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { pAdmin } from 'src/app/helpers/permission';
import { DESTROYER$ } from 'src/app/helpers/unsubscribe';
import { AttendanceDate, AttendanceItem, AttendanceStudentRecord } from 'src/app/models/attendance';
import { AttendanceType } from 'src/app/models/enums/enumConstant';
import { CheckMonthExisted, Student } from 'src/app/models/student';
import { LoadingService } from 'src/app/services/loading.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { StudentAttendanceService } from 'src/app/services/student-attendance.service';
import { FullNamePipe } from 'src/app/shares/name/pipes/full-name.pipe';
import { environment } from 'src/environments/environment';

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY'
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  }
};

@Component({
  selector: 'app-student-attendance-crud',
  templateUrl: './student-attendance-crud.component.html',
  styleUrls: ['./student-attendance-crud.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    FullNamePipe
  ]
})
export class StudentAttendanceCrudComponent implements OnInit {
  pStudent = pAdmin.attendanceRecord;

  private readonly destroyer$ = DESTROYER$();

  readonly loadingService = inject(LoadingService);
  private readonly studentAttendanceService = inject(StudentAttendanceService);
  private readonly dialog = inject(MatDialog);
  private readonly snackbarService = inject(SnackbarService);
  private readonly fb = inject(FormBuilder);
  private readonly namePipe = inject(FullNamePipe);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  readonly location = inject(Location);

  tableDataSource = new MatTableDataSource<AttendanceItem>();
  displayedColumns: string[] = ['position', 'name', 'poor_id', 'present', 'absent', 'permission', 'status', 'action'];

  dateNow: Date = new Date();

  data: AttendanceStudentRecord;

  form: FormGroup = this.fb.group({
    month: [null, Validators.required],
    year: [null, Validators.required],
    date: [null, Validators.required]
  });

  attendanceId: string = this.route.snapshot.params?.attendanceId;
  requestUrl: string = `${environment.api_url}${this.studentAttendanceService.path}/${this.attendanceId}`;

  attendanceType: typeof AttendanceType = AttendanceType;

  ngOnInit(): void {
    if (!!this.attendanceId) this.onLoad();
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
              students: { ...value.students, selected: true },
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

          this.form.patchValue({
            year: res.year,
            month: res.month,
            date: moment(new Date(`${res.month}-01-${res.year}`))
          });
          this.form.disable();
        }
      });
  }

  onRecord(request?: number): void {
    //validate data
    if (this.form.invalid) return this.form.markAllAsTouched();
    else if (this.tableDataSource.data?.length < 1)
      return this.snackbarService.onShowSnackbar({ message: 'សូមបញ្ចូលសិស្ស និងកត់ត្រាវត្តមាន', isError: true });

    const DATA: AttendanceStudentRecord = {
      month: this.form.getRawValue().month,
      year: this.form.getRawValue().year,
      data: this.tableDataSource.data.map(map => {
        return { students: map.students._id, attendances: map.attendances };
      }) as AttendanceItem[],
      request: request || null
    };

    const API_UPDATE: Observable<AttendanceStudentRecord> = this.studentAttendanceService.editAttendance(
      this.attendanceId,
      DATA
    );
    const API_CREATE: Observable<AttendanceStudentRecord> = this.studentAttendanceService.recordAttendance(DATA);
    const API: Observable<AttendanceStudentRecord> = this.attendanceId ? API_UPDATE : API_CREATE;
    const MESSAGE: string = this.attendanceId ? 'edit' : 'add';

    if (!!DATA?.request) {
      const dialog = this.dialog.open(ConfirmDialogComponent, {
        width: '400px',
        data: {
          icon: 'assets/imgs/request.svg',
          message: 'កំណត់ត្រាវត្តមានសម្រាប់ខែនេះបានបញ្ចូល និងពិនិត្យរួចរាល់សម្រាប់ដាក់ស្នើ',
          title: 'បញ្ជូនសំណើ',
          button: 'delete'
        }
      });

      dialog.afterClosed().subscribe(result => {
        if (result) this.onSubmit(API, MESSAGE);
      });
    } else this.onSubmit(API, MESSAGE);
  }

  onSubmit(API: Observable<AttendanceStudentRecord>, MESSAGE: string): void {
    API.pipe(takeUntil(this.destroyer$)).subscribe({
      next: res => {
        const BASE_ROUTE: string[] = [this.attendanceId ? '../..' : '..', 'info', res._id];
        this.snackbarService.onShowSnackbar({ message: MESSAGE });
        this.router.navigate(BASE_ROUTE, { relativeTo: this.route });
      }
    });
  }

  onEdit(data: AttendanceItem): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.snackbarService.onShowSnackbar({ message: 'សូមជ្រើសរើសខែឆ្នាំរបស់កំណត់ត្រាវត្តមាន', isError: true });
      return;
    }

    const dialogRef = this.dialog.open(StudentAttendanceRecordDialogComponent, {
      width: '1000px',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      panelClass: 'mat-dialog__padding-none',
      data: {
        student: this.namePipe.transform(data.students),
        data: data?.attendances || [],
        shift_times: data?.students?.shift_times,
        activeDate: { year: this.form.getRawValue().year, month: this.form.getRawValue().month }
      }
    });

    dialogRef
      .afterClosed()
      .subscribe((result: { present: number; absent: number; permission: number; data: AttendanceDate[] }) => {
        if (result?.data?.length > 0) {
          data.attendances = result.data;
          data.present = result.present;
          data.absent = result.absent;
          data.permission = result.permission;
        }
      });
  }

  onDelete(data: Student): void {
    // data.selected = false;
    // this.tableDataSource = new MatTableDataSource(this.tableDataSource.data.filter(fil => fil?.students?.selected));
  }

  onAddStudent(): void {
    const dialogRef = this.dialog.open(StudentAttendanceAddingStudentDialogComponent, {
      width: '750px',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      panelClass: 'mat-dialog__padding-none',
      data: this.tableDataSource.data.map(map => {
        return { ...map.students, disabled: !!map.scholarship_payments };
      })
    });

    dialogRef.afterClosed().subscribe((result: Student[]) => {
      if (result?.length > 0) {
        //get all id of student in table
        const STUDENTS: string[] = this.tableDataSource.data.map(map => map.students._id);

        //assign value from dialog to table
        const DATA: AttendanceItem[] = [];
        for (const item of result) {
          if (STUDENTS?.length > 0) {
            if (STUDENTS.includes(item._id))
              DATA.push(this.tableDataSource.data.find(value => value.students._id === item._id));
            else
              DATA.push({
                permission: 0,
                absent: 0,
                present: 0,
                students: item,
                attendances: []
              });
          } else
            DATA.push({
              permission: 0,
              absent: 0,
              present: 0,
              students: item,
              attendances: []
            });
        }

        this.tableDataSource = new MatTableDataSource(DATA);
      }
    });
  }

  trackByFn(index: number, item: any): void {
    return item?._id ?? index ?? item?.name ?? item;
  }

  onCheckExisted(value): void {
    if (value) {
      this.startCheckExisted(value);
    }
  }

  timer: ReturnType<typeof setTimeout>;
  startCheckExisted(value): void {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.checkExisted(value);
    }, 500);
  }

  checkExisted(value: CheckMonthExisted): void {
    this.studentAttendanceService
      .checkMonthExisted(value)
      .pipe(takeUntil(this.destroyer$))
      .subscribe(res => {
        if (!!res.exist) this.form.controls.date.setErrors({ dateError: true });
      });
  }

  //date picker handle event
  chosenYearHandler(normalizedYear: Moment) {
    this.form.controls.date.setValue(normalizedYear);

    const ctrlValue = this.form.controls.date.value;
    ctrlValue.year(normalizedYear.year());
    this.form.controls.date.setValue(ctrlValue);

    this.form.controls.year.setValue(this.form.controls.date.value.year());
  }
  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    if (!!this.form.controls.date.value) this.form.controls.date.setValue(normalizedMonth);

    const ctrlValue = this.form.controls.date.value;
    ctrlValue.month(normalizedMonth.month());
    this.form.controls.date.setValue(ctrlValue);
    this.form.controls.month.setValue(this.form.controls.date.value.month() + 1);

    this.onCheckExisted({ year: this.form.getRawValue().year, month: this.form.getRawValue().month });

    //remove all recorded attendances on month & year values changed
    const NEW_DATA: AttendanceItem[] = this.tableDataSource.data.map(map => {
      return { students: map.students, attendances: [], permission: 0, present: 0, absent: 0 };
    });
    this.tableDataSource = new MatTableDataSource(NEW_DATA);

    datepicker.close();
  }

  formattedDate(date: string | Date): string {
    return formatDate(new Date(date), 'yyyy-MM-dd', 'en-US');
  }
}

import { Component, inject } from '@angular/core';

import { formatDate, Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { pAdmin } from 'src/app/helpers/permission';
import { DESTROYER$ } from 'src/app/helpers/unsubscribe';
import { Attendance, AttendanceStudentRecord } from 'src/app/models/attendance';
import { AttendanceType } from 'src/app/models/enums/enumConstant';
import { Student } from 'src/app/models/student';
import { AttendanceService } from 'src/app/services/attendance.service';
import { LoadingService } from 'src/app/services/loading.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { environment } from 'src/environments/environment';
import { AttendanceSubmitAddingStudentDialogComponent } from '../attendance-submit-adding-student-dialog/attendance-submit-adding-student-dialog.component';
import { AttendanceSubmitViewInfoDialogComponent } from '../attendance-submit-view-info-dialog/attendance-submit-view-info-dialog.component';

@Component({
  selector: 'app-attendance-submit-crud',
  templateUrl: './attendance-submit-crud.component.html',
  styleUrls: ['./attendance-submit-crud.component.scss']
})
export class AttendanceSubmitCrudComponent {
  pStudent = pAdmin.attendanceSubmit;
  pPayment = pAdmin.scholarshipPayment;

  private readonly destroyer$ = DESTROYER$();

  readonly loadingService = inject(LoadingService);
  private readonly attendanceService = inject(AttendanceService);
  private readonly dialog = inject(MatDialog);
  private readonly snackbarService = inject(SnackbarService);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  readonly location = inject(Location);

  tableDataSource = new MatTableDataSource<Student>();
  displayedColumns: string[] = ['position', 'name', 'poor_id', 'courses', 'attendance', 'action'];

  dateNow: Date = new Date();

  data: Attendance;

  form: FormGroup = this.fb.group({
    start_date: [null, Validators.required],
    end_date: [{ value: null, disabled: true }, Validators.required]
  });

  attendanceId: string = this.route.snapshot.params?.attendance;
  baseUrl: string = `${environment.api_url}${this.attendanceService.path}_submit/`;
  requestUrl: string = `${this.baseUrl}${this.attendanceId}`;

  attendanceType: typeof AttendanceType = AttendanceType;

  maxDate: Date;
  minDate: Date;

  ngOnInit(): void {
    if (!!this.attendanceId) this.onLoad();
  }

  onLoad(): void {
    this.attendanceService
      .getOneSubmit(this.attendanceId)
      .pipe(
        map(map => {
          //mark select to true to note as checked student and format date of attendance
          map.students = map?.students?.map(value => {
            return {
              ...value,
              is_check: true
            };
          });
          return map;
        }),
        takeUntil(this.destroyer$)
      )
      .subscribe({
        next: res => {
          this.data = res;

          this.tableDataSource = new MatTableDataSource(res.students);

          this.form.patchValue({
            start_date: res?.start_date,
            end_date: res?.end_date
          });
          this.form.disable();
        }
      });
  }

  onRecord(): void {
    //validate data
    if (this.form.invalid) return this.form.markAllAsTouched();
    else if (this.tableDataSource.data?.length < 1)
      return this.snackbarService.onShowSnackbar({ message: 'សូមបញ្ចូលសិស្ស និងកត់ត្រាវត្តមាន', isError: true });

    const DATA: AttendanceStudentRecord = {
      start_date: this.form.getRawValue().start_date,
      end_date: this.form.getRawValue().end_date,
      students: this.tableDataSource.data.map(map => {
        return map._id;
      })
    };

    const API_UPDATE: Observable<AttendanceStudentRecord> = this.attendanceService.updateSubmit(
      this.attendanceId,
      DATA
    );
    const API_CREATE: Observable<AttendanceStudentRecord> = this.attendanceService.submit(DATA);
    const API: Observable<AttendanceStudentRecord> = this.attendanceId ? API_UPDATE : API_CREATE;
    const MESSAGE: string = this.attendanceId ? 'edit' : 'add';
    this.onSubmit(API, MESSAGE);
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

  onDelete(data: Student): void {
    data.is_check = false;
    this.tableDataSource = new MatTableDataSource(this.tableDataSource.data.filter(fil => fil?.is_check));
  }

  onAddStudent(): void {
    const dialogRef = this.dialog.open(AttendanceSubmitAddingStudentDialogComponent, {
      width: '750px',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      panelClass: 'mat-dialog__padding-none',
      data: {
        student: this.tableDataSource.data.map(map => {
          return { ...map, disabled: !!map.scholarship_payments };
        }) || [],
        start_date: this.formattedDate(this.form.value.start_date),
        end_date: this.formattedDate(this.form.value.end_date)
      }
    });

    dialogRef.afterClosed().subscribe((result: Student[]) => {
      if (result?.length > 0) {
        //get all id of student in table
        this.tableDataSource = new MatTableDataSource(result);
      }
    });
  }

  onView(_id: string): void {
    this.dialog.open(AttendanceSubmitViewInfoDialogComponent, {
      width: '750px',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      panelClass: 'mat-dialog__padding-none',
      data: {}
    });
  }

  onClick(label: string, data: Student): void {
    if (label === 'លុប') this.onDelete(data);
    if (label === 'មើលវត្តមាន') this.onView(data._id);
  }

  trackByFn(index: number, item: any): void {
    return item?._id ?? index ?? item?.name ?? item;
  }

  onDateChange(): void {
    this.form.controls.end_date.enable();
    this.validateDate();
  }

  validateDate(): void {
    let data = this.form.value;

    let minDate = new Date((' ' + data.start_date).slice(1));
    let maxDate = new Date((' ' + data.start_date).slice(1));
    this.minDate = new Date(minDate.setDate(new Date(data.start_date).getDate() + 27));
    this.maxDate = new Date(maxDate.setDate(new Date(data.start_date).getDate() + 30));

    if (
      !!data.start_date &&
      !!data.end_date &&
      (new Date(data.start_date).getTime() > new Date(data.end_date).getTime() ||
        new Date(data.end_date).getTime() > maxDate.getTime() ||
        new Date(data.end_date).getTime() < minDate.getTime())
    )
      this.form.controls.end_date.setValue(null);

    this.tableDataSource = new MatTableDataSource([]);
  }

  formattedDate(date: string | Date): string {
    return formatDate(new Date(date), 'yyyy-MM-dd', 'en-US');
  }
}

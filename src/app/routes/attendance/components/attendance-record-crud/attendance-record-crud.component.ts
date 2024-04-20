import { Location, formatDate } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { pAdmin } from 'src/app/helpers/permission';
import { DESTROYER$ } from 'src/app/helpers/unsubscribe';
import { AttendanceRecord, AttendanceScore } from 'src/app/models/attendance';
import { Course } from 'src/app/models/course';
import { CheckMonthExisted, Student } from 'src/app/models/student';
import { AttendanceService } from 'src/app/services/attendance.service';
import { LoadingService } from 'src/app/services/loading.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { Pagination } from 'src/app/shares/pagination/pagination';
import { environment } from 'src/environments/environment';

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY'
  },
  display: {
    dateInput: 'DD MMM YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  }
};

@Component({
  selector: 'app-attendance-record-crud',
  templateUrl: './attendance-record-crud.component.html',
  styleUrls: ['./attendance-record-crud.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ]
})
export class AttendanceRecordCrudComponent implements OnInit {
  private readonly destroyer$ = DESTROYER$();

  readonly loadingService = inject(LoadingService);
  private readonly attendanceService = inject(AttendanceService);
  private readonly fb = inject(FormBuilder);
  readonly location = inject(Location);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly snackbarService = inject(SnackbarService);

  pAttendance = pAdmin.attendance;

  tableDataSource = new MatTableDataSource<Student>();
  displayedColumns: string[] = ['position', 'name', 'poor_id', '0', '25', '50', '75', '100'];
  displayedColumnsMain: string[] = [
    'title',
    '0-check-all',
    '25-check-all',
    '50-check-all',
    '75-check-all',
    '100-check-all'
  ];
  course: Course[];

  form: FormGroup = this.fb.group({
    date: [null, Validators.required],
    courses: [null, Validators.required]
  });

  paramCourse: Pagination = {
    limit: 0,
    page: 1,
    search: null
  };

  requestUrl: string = `${environment.api_url}${this.attendanceService.path}/student`;
  private courseId: string = this.route.snapshot.params?.course;
  private createdDate: string = this.route.snapshot.params?.date;

  checkStatus0: 0 | 1 | -1;
  checkStatus25: 0 | 1 | -1;
  checkStatus50: 0 | 1 | -1;
  checkStatus75: 0 | 1 | -1;
  checkStatus100: 0 | 1 | -1;

  isSubmitted: boolean;

  ngOnInit(): void {
    if (!!this.courseId && !!this.createdDate) {
      this.form.patchValue({
        date: this.createdDate,
        courses: this.courseId
      });

      this.form.disable();

      this.getStudentList();
    } else if (!!this.courseId) {
      this.form.patchValue({
        courses: this.courseId
      });
    }
    this.getCourse();
  }

  onSubmit(): void {
    this.isSubmitted = true;
    if (this.form?.invalid) return this.form.markAllAsTouched();
    
    if (this.tableDataSource.data.some(fil => fil?.attendance_score === undefined || fil?.attendance_score === null))
      return this.snackbarService.onShowSnackbar({ message: 'សូមកត់ត្រាវត្តមានសិស្សទាំងអស់', isError: true });

    let data: AttendanceScore[] = this.tableDataSource.data.map(map => {
      return {
        students: map._id,
        attendance_score: map.attendance_score
      };
    });

    const DATA_SUBMIT: AttendanceRecord = {
      courses: this.form.getRawValue().courses,
      date: formatDate(this.form.getRawValue().date, 'yyyy-MM-dd', 'en-US'),
      data: data
    };

    this.loadingService.setLoading('page', true);

    if (this.courseId && this.createdDate) this.onUpdate(DATA_SUBMIT);
    else this.onCreate(DATA_SUBMIT);
  }

  onCreate(data: AttendanceRecord): void {
    this.attendanceService
      .record(data)
      .pipe(takeUntil(this.destroyer$))
      .subscribe({
        next: res => {
          this.snackbarService.onShowSnackbar({ message: 'add' });
          this.isSubmitted = false;

          if (this.courseId) {
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate(['..', data.courses], { relativeTo: this.route });
            });
          } else
            this.router.navigate([data.courses], {
              relativeTo: this.route
            });
          this.loadingService.setLoading('page', false);
        }, error: () => this.loadingService.setLoading('page', false)
      });
  }

  onUpdate(data: AttendanceRecord): void {
    this.attendanceService
      .record(data)
      .pipe(takeUntil(this.destroyer$))
      .subscribe({
        next: res => {
          this.snackbarService.onShowSnackbar({ message: 'edit' });
          this.getStudentList();
          this.loadingService.setLoading('page', false);
        },
        error: () => this.loadingService.setLoading('page', false)
      });
  }

  onDateChange(): void {
    if (this.form.valid) this.getStudentList();
  }

  onCourseChange(): void {
    if (this.form.valid) this.getStudentList();
  }

  getCourse(): void {
    this.attendanceService
      .getCourse(this.paramCourse)
      .pipe(takeUntil(this.destroyer$))
      .subscribe({
        next: res => {
          this.course = res.list;
        }
      });
  }

  getStudentList(): void {
    const param = {
      limit: 0,
      page: 1,
      date: formatDate(this.form.value.date, 'yyyy-MM-dd', 'en-US'),
      courses: this.form.value.courses
    };
    this.attendanceService
      .getStudentList(param)
      .pipe(takeUntil(this.destroyer$))
      .subscribe({
        next: res => {
          this.tableDataSource = new MatTableDataSource(res.list);
          this.onCheckingCheckbox();
        }
      });
  }

  onCheckboxChange(event: MatCheckboxChange, data: Student, value: number): void {
    if (event.checked) data.attendance_score = value;
    else data.attendance_score = null;

    this.onCheckingCheckbox();
  }

  checkboxStatus(element: Student): string {
    return ((element?.attendance_score === undefined || element?.attendance_score === null) && this.isSubmitted) ||
      element?.attendance_score === null
      ? 'warn'
      : 'primary';
  }

  onCheckAllChange(event: MatCheckboxChange, value: number): void {
    if (event.checked) {
      this.tableDataSource.data.map(map => {
        map.attendance_score = value;
      });
      this.onCheckingCheckbox();
    } else {
      this.tableDataSource.data.map(map => {
        map.attendance_score = null;
      });
      this.onCheckingCheckbox();
    }
  }

  onCheckingCheckbox(): void {
    if (this.tableDataSource.data.every(value => value?.attendance_score === 0 && value?.attendance_score !== null))
      this.checkStatus0 = 1;
    else if (this.tableDataSource.data.some(value => value?.attendance_score === 0 && value?.attendance_score !== null))
      this.checkStatus0 = 0;
    else this.checkStatus0 = -1;

    if (this.tableDataSource.data.every(value => value?.attendance_score === 25)) this.checkStatus25 = 1;
    else if (this.tableDataSource.data.some(value => value?.attendance_score === 25)) this.checkStatus25 = 0;
    else this.checkStatus25 = -1;

    if (this.tableDataSource.data.every(value => value?.attendance_score === 50)) this.checkStatus50 = 1;
    else if (this.tableDataSource.data.some(value => value?.attendance_score === 50)) this.checkStatus50 = 0;
    else this.checkStatus50 = -1;

    if (this.tableDataSource.data.every(value => value?.attendance_score === 75)) this.checkStatus75 = 1;
    else if (this.tableDataSource.data.some(value => value?.attendance_score === 75)) this.checkStatus75 = 0;
    else this.checkStatus75 = -1;

    if (this.tableDataSource.data.every(value => value?.attendance_score === 100)) this.checkStatus100 = 1;
    else if (this.tableDataSource.data.some(value => value?.attendance_score === 100)) this.checkStatus100 = 0;
    else this.checkStatus100 = -1;
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
    this.attendanceService
      .checkMonthExisted(value)
      .pipe(takeUntil(this.destroyer$))
      .subscribe(res => {
        if (!!res.exist) this.form.controls.date.setErrors({ dateError: true });
      });
  }

  //TODO: searching functions
  onSearch(value: string): void {
    this.paramCourse.search = value;
    this.startSearch();
  }

  startSearch(): void {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.getCourse();
    }, 500);
  }
}

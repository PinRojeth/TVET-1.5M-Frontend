import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { CheckMonthExisted } from './../../../../models/student';

import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';

import * as _moment from 'moment';
import { default as _rollupMoment, Moment } from 'moment';
import { DESTROYER$ } from 'src/app/helpers/unsubscribe';
import { StudentAttendance } from 'src/app/models/student';
import { StudentService } from 'src/app/services/student.service';

const moment = _rollupMoment || (_moment as any);

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
  selector: 'app-student-finish-attendance-creating',
  templateUrl: './student-finish-attendance-creating.component.html',
  styleUrls: ['./student-finish-attendance-creating.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ]
})
export class StudentFinishAttendanceCreatingComponent {
  private readonly destroyer$ = DESTROYER$();
  private readonly fb = inject(FormBuilder);

  form: FormGroup = this.fb.group({
    students: [null, Validators.required],
    present: [null, Validators.required],
    absent: [null, Validators.required],
    permission: [null, Validators.required],
    // description: [null, Validators.required],
    year: [null, Validators.required],
    month: [null, Validators.required]
  });
  date = new FormControl(null, Validators.required);

  constructor(
    public dialogRef: MatDialogRef<StudentFinishAttendanceCreatingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { studentId: string; payload: StudentAttendance },
    private studentService: StudentService
  ) {
    this.form.controls.students.setValue(data.studentId);

    if (!!data.payload) this.onLoad();
  }

  onLoad(): void {
    this.form.patchValue({
      students: this.data.studentId,
      present: this.data.payload.present,
      absent: this.data.payload.absent,
      permission: this.data.payload.permission,
      description: this.data.payload.description,
      year: this.data.payload.year,
      month: this.data.payload.month
    });

    const ctrlValue: Moment = moment();
    ctrlValue.year(this.data.payload.year);
    ctrlValue.month(this.data.payload.month - 1);
    this.date.setValue(ctrlValue);
  }

  convertKey(key: string): string {
    return key.replace(/ /g, '_').toLowerCase();
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.date.markAsTouched();
      return this.form.markAllAsTouched();
    }
    this.dialogRef.close(this.form.value);
  }

  trackByFn(index: number, item: any): void {
    return item?._id ?? index ?? item?.name ?? item;
  }

  chosenYearHandler(normalizedYear: Moment) {
    this.date.setValue(normalizedYear);

    const ctrlValue = this.date.value;
    ctrlValue.year(normalizedYear.year());
    this.date.setValue(ctrlValue);

    this.form.controls.year.setValue(this.date.value.year());
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    if (!!this.date.value) this.date.setValue(normalizedMonth);

    const ctrlValue = this.date.value;
    ctrlValue.month(normalizedMonth.month());
    this.date.setValue(ctrlValue);
    this.form.controls.month.setValue(this.date.value.month() + 1);

    this.onCheckExisted({ students: this.data.studentId, year: this.form.value.year, month: this.form.value.month });

    datepicker.close();
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
    this.studentService
      .checkMonthExisted(value)
      .pipe(takeUntil(this.destroyer$))
      .subscribe(res => {
        if (!!res.exist) this.date.setErrors({ dateError: true });
      });
  }
}

import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { pAdmin } from 'src/app/helpers/permission';
import { DESTROYER$ } from 'src/app/helpers/unsubscribe';
import { AttendanceItem, AttendanceStudentRecord } from 'src/app/models/attendance';
import EnumConstant from 'src/app/models/enums/enumConstant';
import { DialogService } from 'src/app/services/dialog.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { StudentAttendanceService } from 'src/app/services/student-attendance.service';
import { PermissionPipe } from 'src/app/shares/role/pipes/permission.pipe';

interface Status {
  name: string;
  _id: number;
  name_en: string;
}

@Component({
  selector: 'app-student-attendance-payment-dialog',
  templateUrl: './student-attendance-payment-dialog.component.html',
  styleUrls: ['./student-attendance-payment-dialog.component.scss'],
  providers: [PermissionPipe]
})
export class StudentAttendancePaymentDialogComponent {
  private readonly destroyer$ = DESTROYER$();

  private readonly fb = inject(FormBuilder);
  private readonly permissionPipe = inject(PermissionPipe);
  private readonly dialogService = inject(DialogService);
  private readonly studentAttendanceService = inject(StudentAttendanceService);
  private readonly snackbarService = inject(SnackbarService);

  pPayment = pAdmin.scholarshipPayment;

  form: FormGroup = this.fb.group({
    status: [null, Validators.required],
    paid_amount: [null, Validators.required],
    reason: [null],
    month: [null, Validators.required],
    students: [null, Validators.required],
    year: [null, Validators.required]
  });

  status: Array<Status> = [
    {
      name: 'អនុម័ត',
      _id: 1,
      name_en: 'allow'
    },
    {
      name: 'បដិសេធ',
      _id: -3,
      name_en: 'reject'
    }
  ];

  constructor(
    public dialogRef: MatDialogRef<StudentAttendancePaymentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AttendanceStudentRecord & { data: AttendanceItem }
  ) {
    this.onLoad();
  }

  onLoad(): void {
    this.form.patchValue({
      month: this.data.month,
      students: this.data.data.students._id,
      year: this.data.year,
      status: this.data.data?.scholarship_payments?.status ?? null,
      paid_amount: this.data.data?.scholarship_payments?.paid_amount ?? null,
      reason: this.data.data?.scholarship_payments?.reason ?? null
    });

    if (!this.permissionPipe.transform([this.pPayment.write])) this.form.disable();
    if (this.form.value.status === EnumConstant.REJECT) this.form.controls.reason.setValidators([Validators.required]);
  }

  onSubmit(): void {
    if (this.form.invalid) return this.form.markAllAsTouched();

    this.dialogRef.close(this.form.value);
  }

  onStatusChange(): void {
    if (this.form.value.status === EnumConstant.ACTIVE) this.form.controls.reason.clearValidators();
    else this.form.controls.reason.setValidators([Validators.required]);
    this.form.controls.reason.updateValueAndValidity();
  }

  onDelete(): void {
    this.dialogService
      .onShowDialog({
        title: 'លុបប្រាក់ឧបត្ថម្ភ',
        message: 'តើអ្នកពិតជាចង់លុបប្រាក់ឧបត្ថម្ភនេះមែនទេ?'
      })
      .afterClosed()
      .subscribe(res => {
        if (res === 'confirm') {
          this.snackbarService.onShowSnackbar({ message: 'delete' });
          this.studentAttendanceService
            .deletePayment(this.data.data.scholarship_payments._id)
            .pipe(takeUntil(this.destroyer$))
            .subscribe({
              next: res => {
                this.dialogRef.close('deleted');
                this.snackbarService.onShowSnackbar({ message: 'delete' });
                this.onLoad();
              }
            });
        }
      });
  }

  trackByFn(index: number, item: any): void {
    return item?._id ?? index ?? item?.name ?? item;
  }

  getStatus(): Status {
    return this.status.find(value => value._id === this.form.value?.status);
  }
}

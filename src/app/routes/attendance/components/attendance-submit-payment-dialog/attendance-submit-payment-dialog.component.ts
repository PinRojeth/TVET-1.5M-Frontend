import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { pAdmin } from 'src/app/helpers/permission';
import { DESTROYER$ } from 'src/app/helpers/unsubscribe';
import { AttendanceStudentRecord } from 'src/app/models/attendance';
import EnumConstant from 'src/app/models/enums/enumConstant';
import { Student } from 'src/app/models/student';
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
  selector: 'app-attendance-submit-payment-dialog',
  templateUrl: './attendance-submit-payment-dialog.component.html',
  styleUrls: ['./attendance-submit-payment-dialog.component.scss'],
  providers: [PermissionPipe]
})
export class AttendanceSubmitPaymentDialogComponent {
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
    students: [null, Validators.required],
    attendance_submits: [null, Validators.required]
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
    public dialogRef: MatDialogRef<AttendanceSubmitPaymentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AttendanceStudentRecord & { student: Student }
  ) {
    this.onLoad();
  }

  onLoad(): void {
    this.form.patchValue({
      students: this.data.student?._id,
      status: this.data.student?.scholarship_payments?.status ?? null,
      paid_amount: this.data.student?.scholarship_payments?.paid_amount ?? null,
      reason: this.data.student?.scholarship_payments?.reason ?? null,
      attendance_submits: this.data._id
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
            .deletePayment(this.data.student.scholarship_payments._id)
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

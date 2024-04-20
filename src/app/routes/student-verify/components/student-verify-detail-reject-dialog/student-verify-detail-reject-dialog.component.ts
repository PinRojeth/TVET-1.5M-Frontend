import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-student-verify-detail-reject-dialog',
  templateUrl: './student-verify-detail-reject-dialog.component.html',
  styleUrls: ['./student-verify-detail-reject-dialog.component.scss']
})
export class StudentVerifyDetailRejectDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<StudentVerifyDetailRejectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string }
  ) {}

  reason: FormControl = new FormControl(null, Validators.required);

  onSubmit() {
    if (this.reason.invalid) return this.reason.markAsTouched();
    this.dialogRef.close(this.reason.value);
  }
}

import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { passwordMatcher } from 'src/app/helpers/password-matcher';

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.scss']
})
export class AddUserDialogComponent {
  form: FormGroup;

  hideOldPassword = true;
  hideNewPassword = true;
  hideConfirmPassword = true;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      'username': [null, [Validators.required, Validators.minLength(6)]],
      'password': [null, [Validators.required, Validators.minLength(8)]],
      'confirm_password': [null],
    },
      {
        validators: passwordMatcher('password', 'confirm_password')
      }
    );
  }

  onSubmit() {
    if (!this.form.valid) return;
    this.dialogRef.close(this.form.value);
  }
}

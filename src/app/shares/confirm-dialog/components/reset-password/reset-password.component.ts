import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { passwordMatcher } from 'src/app/helpers/password-matcher';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  form: FormGroup;

  hideNewPassword = true;
  hideConfirmPassword = true;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ResetPasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      'new_password': [null, [Validators.required, Validators.minLength(8)]],
      'confirm_password': [null],
    },
      {
        validators: passwordMatcher('new_password', 'confirm_password')
      }
    );
  }

  onSubmit() {
    if (!this.form.valid) return;
    this.dialogRef.close(this.form.value);
  }

}

import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-reject-dialog-with-msg',
  templateUrl: './reject-dialog-with-msg.component.html',
  styleUrls: ['./reject-dialog-with-msg.component.scss']
})
export class RejectDialogWithMsgComponent implements OnInit {

  title: string;
  hint: string;
  icon: string;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<RejectDialogWithMsgComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.form = this.fb.group({
      reason: data?.optional_reason ? [''] : ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.title = this.data.title;
    this.hint = this.data?.hint;
    this.icon = this.data.icon;
  }

  onSubmit() {
    if (!this.form.valid) return;
    this.dialogRef.close(this.form.value);
  }

}

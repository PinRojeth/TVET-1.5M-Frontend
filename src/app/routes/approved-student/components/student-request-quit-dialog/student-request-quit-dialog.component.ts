import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { takeUntil } from 'rxjs';
import { DESTROYER$ } from 'src/app/helpers/unsubscribe';
import { StudentFinishEnum } from 'src/app/models/enums/enumConstant';
import { TypeEnum } from 'src/app/models/type_enum';
import { StudentService } from 'src/app/services/student.service';


@Component({
  selector: 'app-student-request-quit-dialog',
  templateUrl: './student-request-quit-dialog.component.html',
  styleUrls: ['./student-request-quit-dialog.component.scss']
})
export class StudentRequestQuitDialogComponent implements OnInit {
  private readonly destroyer$ = DESTROYER$();
  typeLeaveScholarships: TypeEnum[] = [];
  private readonly fb = inject(FormBuilder);

  form: FormGroup = this.fb.group({
    students: [null, Validators.required],
    quit_type: [null, Validators.required],
    reason: [null]
  });

  readonly studentFinishEnum = Object.keys(StudentFinishEnum)
    .filter(v => isNaN(Number(v)))
    .map((map, index) => {
        return { _id: index + 1, name: 'enum_status.student_finish.' + this.convertKey(map) };
    });


  constructor(
    public dialogRef: MatDialogRef<StudentRequestQuitDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { studentId: string },
    public studentService: StudentService
  ) {
    this.form.controls.students.setValue(data.studentId);
  }
  
  ngOnInit(): void {
    this.getTypeLeaveScholarship();

  }

  
  private getTypeLeaveScholarship(): void {
    this.studentService
      .typeLeaveScholarship()
      .pipe(takeUntil(this.destroyer$))
      .subscribe(res => {
        this.typeLeaveScholarships = res.list;
      });
  }

  convertKey(key: string): string {
    return key.replace(/ /g, '_').toLowerCase();
  }

  onSubmit(): void {
    if (this.form.invalid) return this.form.markAllAsTouched();
    this.dialogRef.close(this.form.value);
  }

  trackByFn(index: number, item: any): void {
    return item?._id ?? index ?? item?.name ?? item;
  }
}

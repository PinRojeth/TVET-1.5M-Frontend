import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { takeUntil } from 'rxjs/operators';
import { DESTROYER$ } from 'src/app/helpers/unsubscribe';
import { Course } from 'src/app/models/course';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-student-finish-change-course-dialog',
  templateUrl: './student-finish-change-course-dialog.component.html',
  styleUrls: ['./student-finish-change-course-dialog.component.scss']
})
export class StudentFinishChangeCourseDialogComponent {
  private readonly destroyer$ = DESTROYER$();

  private readonly fb = inject(FormBuilder);
  private readonly studentService = inject(StudentService);

  form: FormGroup = this.fb.group({
    courses: [null, Validators.required]
  });

  course: Course[];

  constructor(
    public dialogRef: MatDialogRef<StudentFinishChangeCourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { students: string, requesting: number }
  ) {
    this.onLoad(data);
  }

  onLoad(data: any): void {
    this.studentService
      .getCourse(data.students, { limit: 0, page: 1, requesting: data.requesting })
      .pipe(takeUntil(this.destroyer$))
      .subscribe({
        next: res => {
          this.course = res.list;
        }
      });
  }

  onSubmit(): void {
    if (this.form.invalid) return this.form.markAllAsTouched();
    this.dialogRef.close(this.form.value);
  }

  trackByFn(index: number, item: any): void {
    return item?._id ?? index ?? item?.name ?? item;
  }
}

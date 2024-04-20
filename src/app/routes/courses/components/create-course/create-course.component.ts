import { DatePipe, formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { takeUntil } from 'rxjs';
import { DESTROYER$ } from 'src/app/helpers/unsubscribe';
import { Course } from 'src/app/models/course';
import { Major } from 'src/app/models/major';
import { Shift } from 'src/app/models/shift';
import { CourseService } from 'src/app/services/course.service';
import { MajorService } from 'src/app/services/major.service';
import { ShiftService } from 'src/app/services/shift.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { Pagination } from 'src/app/shares/pagination/pagination';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.scss']
})
export class CreateCourseComponent {
  private readonly destroyer$ = DESTROYER$();

  courseId: string;
  form: FormGroup;
  isLoading = false;

  latestHtml: any;
  quillEditorRef: any;
  majors: Major[] = [];
  shifts: Shift[] = [];
  params: Pagination = {
    page: 1,
    limit: 0,
    search: null
  };

  paramsShift: Pagination = {
    page: 1,
    limit: 0,
    search: null
  };

  modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],

      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }, { 'align': [] }],
      [{ 'script': 'sub' }, { 'script': 'super' }],
      [{ 'direction': 'rtl' }],

      [{ 'color': [] }, { 'background': [] }],

      ['link']
    ]
  };

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private courseService: CourseService,
    private snackbarService: SnackbarService,
    public translate: TranslateService,
    private majorService: MajorService,
    private shiftService: ShiftService,
    private datePipe: DatePipe
  ) {
    this.courseId = this.route.snapshot.paramMap.get('courseId');
  }

  get f() {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.initFormGroup();
    this.getMajor();
    this.getShifts();

    if (!this.courseId) return;
    this.getInfo();
  }

  initFormGroup(): void {
    this.form = this.fb.group({
      code: ['', Validators.required],
      registation_start: ['', Validators.required],
      registation_end: ['', Validators.required],
      apply_majors: ['', Validators.required],
      fee: [null],
      requirement: [null],
      student_amount: [null, Validators.required],
      shifts: ['', Validators.required],
      course_start: ['', Validators.required],
      course_end: ['', Validators.required]
    });
    this.form.get('registation_end').disable();
    this.form.get('course_start').disable();
    this.form.get('course_end').disable();
    this.form.get('registation_start').valueChanges.subscribe(() => {
      this.form.get('registation_end').enable();
      this.form.get('course_start').enable();
      this.form.get('course_end').enable();
    });
  }

  getMajor(): void {
    this.majorService.getMany(this.params).subscribe(res => {
      this.majors = res.list;
    });
  }

  getShifts(): void {
    this.shiftService.getMany(this.paramsShift).subscribe(res => {
      this.shifts = res.list;
    });
  }

  getInfo(): void {
    this.courseService
      .getById(this.courseId)
      .pipe(takeUntil(this.destroyer$))
      .subscribe({
        next: res => {
          this.patchFormGroup(res);
        }
      });
  }

  patchFormGroup(item: Course): void {
    this.form.patchValue({
      code: item?.code,
      duration: item.duration,
      fee: item.fee,
      requirement: item?.requirement,
      student_amount: item?.student_amount,
      registation_start: item?.registation_start,
      registation_end: item?.registation_end,
      apply_majors: item?.apply_majors?._id,
      shifts: item?.shifts?._id,
      course_start: item?.course_start,
      course_end: item?.course_end
    });
  }

  create(data: Course): void {
    this.courseService
      .create(data)
      .pipe(takeUntil(this.destroyer$))
      .subscribe({
        next: res => {
          this.isLoading = false;
          this.snackbarService.onShowSnackbar({ message: 'add' });
          this.router.navigate(['../info', res._id], { relativeTo: this.route });
        }
      });
  }

  update(data: Course): void {
    this.courseService
      .update(this.courseId, data)
      .pipe(takeUntil(this.destroyer$))
      .subscribe({
        next: res => {
          this.isLoading = false;
          this.snackbarService.onShowSnackbar({ message: 'add' });
          this.router.navigate(['../../info', res._id], { relativeTo: this.route });
        }
      });
  }

  onDateChange(change: 'start' | 'end' | 'start_regis' | 'end_regis') {
    const startDate = this.datePipe.transform(this.form.value.registation_start, 'yyyyMMdd');
    const endDate = this.datePipe.transform(this.form.value.registation_end, 'yyyyMMdd');
    const startDateCourse = this.datePipe.transform(this.form.value.course_start, 'yyyyMMdd');
    const endDateCourse = this.datePipe.transform(this.form.value.course_end, 'yyyyMMdd');

    if (!startDate || !endDate) {
      return;
    }
    if (endDate < startDate) {
      if (change == 'start_regis') {
        this.form.controls['registation_end'].patchValue(null);
        this.form.controls['course_start'].patchValue(null);
        this.form.controls['course_end'].patchValue(null);
      } else {
        this.form.controls['registation_start'].patchValue(null);
      }
    } else if (startDateCourse < startDate) {
      if (change == 'start') {
        this.form.controls['registation_start'].patchValue(null);
      } else {
        this.form.controls['course_start'].patchValue(null);
      }
    } else if (endDateCourse < startDateCourse) {
      if (change == 'start') {
        this.form.controls['course_end'].patchValue(null);
      } else {
        this.form.controls['course_start'].patchValue(null);
      }
    }
  }

  // beforeShowDay(date: Date): any {
  //   if (this.endDateCourse && date.getTime() === this.endDateCourse.getTime() - 86400000) {
  //     return [false, 'disabled', 'Day before start date'];
  //   } else {
  //     return [true, '', ''];
  //   }
  // }

  onSubmit(): void {
    if (!this.form.valid) return;
    // this.isLoading = true;

    const formValue = this.form.value;
    const data = {
      ...formValue,
      registation_start: this.formattedDate(formValue.registation_start),
      registation_end: this.formattedDate(formValue.registation_end),
      course_start: this.formattedDate(formValue.course_start),
      course_end: this.formattedDate(formValue.course_end)
    };

    if (!this.courseId) {
      // create
      this.create(data);
    } else {
      // update
      this.update(data);
    }
  }

  private formattedDate(date: Date): string {
    return formatDate(date, 'yyyy-MM-dd', 'en-US');
  }

  changedEditor(event: any) {
    if (event.event == 'text-change') {
      this.latestHtml = event.html;
    }
  }

  //TODO: searching functions
  timer: ReturnType<typeof setTimeout>;
  onSearch(value: string): void {
    this.params.search = value;
    this.startSearch();
  }

  startSearch(): void {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.getMajor();
    }, 500);
  }

  onSearchShift(value: string): void {
    this.paramsShift.search = value;
    this.startSearchShift();
  }

  startSearchShift(): void {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.getShifts();
    }, 500);
  }
}

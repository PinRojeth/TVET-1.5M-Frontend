import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Params } from '@angular/router';
import { map, takeUntil } from 'rxjs';
import { pAdmin } from 'src/app/helpers/permission';
import { DESTROYER$ } from 'src/app/helpers/unsubscribe';
import { Course, CourseReport } from 'src/app/models/course';
import { BaseDatatable } from 'src/app/models/datatables/base.datatable';
import { TableColumn } from 'src/app/models/table-column';
import { CourseService } from 'src/app/services/course.service';
import { DialogService } from 'src/app/services/dialog.service';
import { LoadingService } from 'src/app/services/loading.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { Pagination } from 'src/app/shares/pagination/pagination';
import { SnackbarComponent } from 'src/app/shares/snackbar/components/snackbar/snackbar.component';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-report-course',
  templateUrl: './report-course.component.html',
  styleUrls: ['./report-course.component.scss']
})
export class ReportCourseComponent {
  pCourse = pAdmin.course;
  formDate = inject(FormBuilder).group({
    start: [null, Validators.required],
    end: [null, Validators.required]
  });
  tableColumns: TableColumn[] = [
    {
      name: 'table.code',
      dataKey: 'code',
      custom: true
    },
    {
      name: 'table.major',
      dataKey: 'major',
      custom: true
    },
    {
      name: 'table.registration_start_date',
      dataKey: 'register_start_date',
      custom: true
    },
    {
      name: 'table.registration_end_date',
      dataKey: 'register_end_date',
      custom: true
    },
    {
      name: 'table.course_start_date',
      dataKey: 'course_start_date',
      custom: true
    },
    {
      name: 'table.course_end_date',
      dataKey: 'course_end_date',
      custom: true
    },
    {
      name: 'table.shift',
      dataKey: 'shift',
      custom: true
    },
    {
      name: 'table.school',
      dataKey: 'school',
      custom: true
    },
    {
      name: 'table.total_submit_student_count',
      dataKey: 'total_student_count',
      custom: true
    },
    {
      name: 'table.approve_to_study',
      dataKey: 'student_active_count',
      custom: true
    },
    {
      name: 'table.open_session',
      dataKey: ''
    }
  ];

  private readonly destroyer$ = DESTROYER$();

  tableDataSource: BaseDatatable<Course>;

  // filterParams: Params = {};

  constructor(readonly loadingService: LoadingService, public courseService: CourseService) {}

  onLoad(pagination?): void {
    this.loadingService.setLoading('page', true);
    let startDate: string = `${new Date(this.formDate.value.start).toLocaleDateString('en-ZA')} ${new Date(
      this.formDate.value.start
    ).toLocaleTimeString('en-US', { hour12: false })}`;
    let endDate: string = `${new Date(this.formDate.value.end).toLocaleDateString('en-ZA')} ${new Date(
      this.formDate.value.end
    ).toLocaleTimeString('en-US', { hour12: false })}`;
    this.courseService.getDataCourseByDateRange({ ...pagination, start_date: startDate, end_date: endDate }).subscribe({
      next: res => {
        this.tableDataSource = res;
        takeUntil(this.destroyer$);
        this.loadingService.setLoading('page', false);
        console.log(res);
      }
    });
  }
  formatDate(date: Date) {
    // Ensure date is a valid Date object
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      return 'Invalid Date';
    }

    // Get date components
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
    const year = date.getFullYear();

    // Return formatted date string (example: "DD-MM-YYYY")
    return `${day}-${month}-${year}`;
  }
  onExportFile(): void {
    let dataExportColumn = [];
    for (let course of this?.tableDataSource?.list) {
      dataExportColumn.push({
        id: course?._id,
        code: course?.code,
        major: course?.apply_majors?.name,
        registerStartDate: `${this.formatDate(new Date(course.registation_start))}
        `,
        registerEndDate: `${this.formatDate(new Date(course.registation_end))}`,
        course_start_date: this.formatDate(new Date(course?.course_start)),
        course_end_date: this.formatDate(new Date(course?.course_end)),
        shift: course?.shifts.name,
        school: course?.schools?.name,
        total_approve: course['student_active_count'],
        total_apply: course['total_submit_student_count']
      });
    }

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataExportColumn);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Course-Table-Sheet');

    // Save to file
    XLSX.writeFile(wb, 'Course-table.xlsx');
  }

  onInputDate(): void {
    let data = this.formDate.value;
    if (!!data.start && !!data.end && new Date(data.start).getTime() > new Date(data.end).getTime()) {
      this.formDate.controls.end.markAsTouched();
      this.formDate.controls.end.setErrors({ 'minDate': true });
    } else if (!!this.formDate.controls.end.value && this.formDate.controls.end.invalid) {
      this.formDate.controls.end.setErrors(null);
    }
  }

  dateRangeChange(): void {
    if (this.formDate.valid) {
      this.onLoad();
    } else return;
  }

  onDateChange(): void {
    this.formDate.markAllAsTouched();
    this.dateRangeChange();
  }

  goTo(pagination?: Pagination) {
    this.onLoad(pagination);
  }
}

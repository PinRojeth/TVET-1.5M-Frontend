import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Params } from '@angular/router';
import { ApplyCountBySchool } from 'src/app/models/report';
import { TableColumn } from 'src/app/models/table-column';
import { CourseService } from 'src/app/services/course.service';
import { LoadingService } from 'src/app/services/loading.service';
import { Pagination } from 'src/app/shares/pagination/pagination';

@Component({
  selector: 'app-report-course',
  templateUrl: './report-course.component.html',
  styleUrls: ['./report-course.component.scss']
})
export class ReportCourseComponent {
  tableDateSource = new MatTableDataSource<ApplyCountBySchool>(null);

  formDate = inject(FormBuilder).group({
    start: [null, Validators.required],
    end: [null, Validators.required]
  });

  baseColumn: string[] = [
    'ID',
    'Code',
    'Skill',
    'RegisterDate',
    'Start_date',
    'End_date',
    'Shift',
    'School',
    'Total_Student'
  ];

  constructor(readonly loadingService: LoadingService, private courseService: CourseService) {}

  onLoad(): void {
    this.loadingService.setLoading('page', true);
    let data = [];
    let startDate: string = `${new Date(this.formDate.value.start).toLocaleDateString('en-ZA')} ${new Date(
      this.formDate.value.start
    ).toLocaleTimeString('en-US', { hour12: false })}`;

    let endDate: string = `${new Date(this.formDate.value.end).toLocaleDateString('en-ZA')} ${new Date(
      this.formDate.value.end
    ).toLocaleTimeString('en-US', { hour12: false })}`;
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
}

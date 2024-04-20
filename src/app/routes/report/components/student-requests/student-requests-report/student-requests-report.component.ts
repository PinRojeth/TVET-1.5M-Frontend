import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { Moment } from 'moment';
import { MY_FORMATS } from 'src/app/helpers/my-date-formats';
import { StudentRequestReport } from 'src/app/models/report';

@Component({
  selector: 'app-student-requests-report',
  templateUrl: './student-requests-report.component.html',
  styleUrls: ['./student-requests-report.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ]
})
export class StudentRequestsReportComponent {

  exportData: StudentRequestReport = {
    requestBySchool: null,
    requestByMajor: null
  };

  startDate: FormControl = new FormControl(
    formatDate(new Date(new Date().setDate(new Date().getDate() - 30)), 'yyyy-MM-dd', 'en-US')
  );
  endDate: FormControl = new FormControl(formatDate(new Date(), 'yyyy-MM-dd', 'en-US'));

  dateRangeChange(date: Moment, label: number): void {
    if (date && date['_d']) {
      if (label === 1) this.startDate.patchValue(formatDate(new Date(date['_d']), 'yyyy-MM-dd', 'en-US'));
      else this.endDate.patchValue(formatDate(new Date(date['_d']), 'yyyy-MM-dd', 'en-US'));
    }
  }

}

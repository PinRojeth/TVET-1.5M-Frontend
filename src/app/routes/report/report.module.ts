import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule
} from '@angular-material-components/datetime-picker';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { TranslateModule } from '@ngx-translate/core';
import { ChartjsModule } from 'src/app/shares/chartjs/chartjs.module';
import { EmptyModule } from 'src/app/shares/empty/empty.module';
import { Base64ImagePipe } from 'src/app/shares/file/base64-image.pipe';
import { FilteringModule } from 'src/app/shares/filtering/filtering.module';
import { KhmerDatePipe } from 'src/app/shares/khmer-date/khmer-date.pipe';
import { NameModule } from 'src/app/shares/name/name.module';
import { StaticFileModule } from 'src/app/shares/static-file/static-file.module';
import { TableModule } from 'src/app/shares/table/table.module';
import { TranslateApiModule } from 'src/app/shares/translate-api/translate-api.module';
import { ZippyModule } from 'src/app/shares/zippy/zippy.module';
import { ApproveStudentReportComponent } from './components/approve-student-report/approve-student-report.component';
import { AttendanceReportComponent } from './components/attendance-report/attendance-report.component';
import { ExportAsExcelApproveStudentsDirective } from './components/directives/export-as-excel-approve-students.directive';
import { ExportAsPdfApproveStudentsDirective } from './components/directives/export-as-pdf-approve-students.directive';
import { RequestApprovedDirective } from './components/directives/request-approved.directive';
import { StudentDataReportPipe } from './components/pipes/student-data-report.pipe';
import { ReportApprovalComponent } from './components/report-approval/report-approval.component';
import { ReportEnrollmentComponent } from './components/report-enrollment/report-enrollment.component';
import { StudentRequestsByMajorComponent } from './components/student-requests/student-requests-by-major/student-requests-by-major.component';
import { StudentRequestsBySchoolComponent } from './components/student-requests/student-requests-by-school/student-requests-by-school.component';
import { StudentRequestsReportComponent } from './components/student-requests/student-requests-report/student-requests-report.component';
import { ReportRoutingModule } from './report-routing.module';
import { ReportEnrollmentMajorComponent } from './components/report-enrollment-major/report-enrollment-major.component';
import { ReportApprovalMajorComponent } from './components/report-approval-major/report-approval-major.component';
import { ReportEnrollmentByAllComponent } from './components/report-enrollment-by-all/report-enrollment-by-all.component';
import { ReportApprovalByAllComponent } from './components/report-approval-by-all/report-approval-by-all.component';
import { ReportStatusBySchoolComponent } from './components/report-status-by-school/report-status-by-school.component';
import { ReportStatusByMajorComponent } from './components/report-status-by-major/report-status-by-major.component';
import { StatusPipeModule } from 'src/app/shares/status-pipe/status-pipe.module';
import { ReportCourseComponent } from './components/report-course/report-course.component';
@NgModule({
  declarations: [
    StudentRequestsReportComponent,
    StudentRequestsBySchoolComponent,
    StudentRequestsByMajorComponent,
    RequestApprovedDirective,
    AttendanceReportComponent,
    ApproveStudentReportComponent,
    ExportAsExcelApproveStudentsDirective,
    ExportAsPdfApproveStudentsDirective,
    ReportEnrollmentComponent,
    ReportApprovalComponent,
    StudentDataReportPipe,
    ReportEnrollmentMajorComponent,
    ReportApprovalMajorComponent,
    ReportEnrollmentByAllComponent,
    ReportApprovalByAllComponent,
    ReportStatusBySchoolComponent,
    ReportStatusByMajorComponent,
    ReportCourseComponent
  ],
  imports: [
    CommonModule,
    ReportRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatNativeDateModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    ChartjsModule,
    TableModule,
    ZippyModule,
    FilteringModule,
    StaticFileModule,
    NameModule,
    TranslateModule,
    TranslateApiModule,
    MatMenuModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    MatInputModule,
    MatProgressBarModule,
    MatTableModule,
    EmptyModule,
    StatusPipeModule
  ],
  providers: [Base64ImagePipe, KhmerDatePipe]
})
export class ReportModule {}

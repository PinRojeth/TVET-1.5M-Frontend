import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApproveStudentReportComponent } from './components/approve-student-report/approve-student-report.component';
import { AttendanceReportComponent } from './components/attendance-report/attendance-report.component';
import { ReportApprovalByAllComponent } from './components/report-approval-by-all/report-approval-by-all.component';
import { ReportApprovalMajorComponent } from './components/report-approval-major/report-approval-major.component';
import { ReportApprovalComponent } from './components/report-approval/report-approval.component';
import { ReportEnrollmentByAllComponent } from './components/report-enrollment-by-all/report-enrollment-by-all.component';
import { ReportEnrollmentMajorComponent } from './components/report-enrollment-major/report-enrollment-major.component';
import { ReportEnrollmentComponent } from './components/report-enrollment/report-enrollment.component';
import { ReportStatusByMajorComponent } from './components/report-status-by-major/report-status-by-major.component';
import { ReportStatusBySchoolComponent } from './components/report-status-by-school/report-status-by-school.component';
import { StudentRequestsReportComponent } from './components/student-requests/student-requests-report/student-requests-report.component';
import { ReportCourseComponent } from './components/report-course/report-course.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'student-requests',
    pathMatch: 'full'
  },
  {
    path: 'student-requests',
    component: StudentRequestsReportComponent
  },
  {
    path: 'course',
    component: ReportCourseComponent
  },
  {
    path: 'attendance',
    component: AttendanceReportComponent
  },
  {
    path: 'approve-student',
    component: ApproveStudentReportComponent
  },
  {
    path: 'enrollment-by-all',
    component: ReportEnrollmentByAllComponent
  },
  {
    path: 'enrollment',
    component: ReportEnrollmentComponent
  },
  {
    path: 'enrollment-major',
    component: ReportEnrollmentMajorComponent
  },
  {
    path: 'approval',
    component: ReportApprovalComponent
  },
  {
    path: 'approval-major',
    component: ReportApprovalMajorComponent
  },
  {
    path: 'approval-by-all',
    component: ReportApprovalByAllComponent
  },
  {
    path: 'status-by-school',
    component: ReportStatusBySchoolComponent
  },
  {
    path: 'status-by-major',
    component: ReportStatusByMajorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule {}

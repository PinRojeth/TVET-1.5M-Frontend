import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ApprovedStudentPipe } from './pipes/approved-student.pipe';
import { RemoveUnderscorePipe } from './pipes/remove-underscore.pipe';
import { ScholarshipStatusPipe } from './pipes/scholarship-status.pipe';
import { StringUnderscorePipe } from './pipes/string-underscore.pipe';
import { StudentAttendancePipe } from './pipes/student-attendance.pipe';
import { TableStatusPipe } from './pipes/table-status.pipe';
import { TranslateStatusPipe } from './pipes/translate-status.pipe';
import { VerifyStudentPipe } from './pipes/verify-student.pipe';

@NgModule({
  declarations: [
    TableStatusPipe,
    RemoveUnderscorePipe,
    TranslateStatusPipe,
    ApprovedStudentPipe,
    StringUnderscorePipe,
    StudentAttendancePipe,
    ScholarshipStatusPipe,
    VerifyStudentPipe
  ],
  imports: [CommonModule],
  exports: [
    TableStatusPipe,
    RemoveUnderscorePipe,
    TranslateStatusPipe,
    ApprovedStudentPipe,
    StringUnderscorePipe,
    StudentAttendancePipe,
    ScholarshipStatusPipe,
    VerifyStudentPipe
  ]
})
export class StatusPipeModule {}

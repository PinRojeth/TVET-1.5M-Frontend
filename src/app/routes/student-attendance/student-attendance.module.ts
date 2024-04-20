import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { StudentAttendanceCrudComponent } from './components/student-attendance-crud/student-attendance-crud.component';
import { StudentAttendanceInfoComponent } from './components/student-attendance-info/student-attendance-info.component';
import { StudentAttendanceComponent } from './components/student-attendance/student-attendance.component';
import { StudentAttendanceRoutingModule } from './student-attendance-routing.module';

import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { TranslateModule } from '@ngx-translate/core';
import { EmptyModule } from 'src/app/shares/empty/empty.module';
import { FilteringModule } from 'src/app/shares/filtering/filtering.module';
import { KhmerDateModule } from 'src/app/shares/khmer-date/khmer-date.module';
import { MatQuillModule } from 'src/app/shares/mat-quill/mat-quill-module';
import { NameModule } from 'src/app/shares/name/name.module';
import { SearchbarInSelectOptionModule } from 'src/app/shares/searchbar-in-select-option/searchbar-in-select-option.module';
import { StaticFileModule } from 'src/app/shares/static-file/static-file.module';
import { TableModule } from 'src/app/shares/table/table.module';
import { TranslateApiModule } from 'src/app/shares/translate-api/translate-api.module';
import { ZippyModule } from 'src/app/shares/zippy/zippy.module';
import { RoleModule } from '../../shares/role/role.module';
import { StatusPipeModule } from '../../shares/status-pipe/status-pipe.module';

import { MatTooltipModule } from '@angular/material/tooltip';
import { AttendanceCountModule } from 'src/app/shares/attendance-count/attendance-count.module';
import { StudentAttendanceAddingStudentDialogComponent } from './components/student-attendance-adding-student-dialog/student-attendance-adding-student-dialog.component';
import { StudentAttendancePaymentDialogComponent } from './components/student-attendance-payment-dialog/student-attendance-payment-dialog.component';
import { StudentAttendanceRecordDialogComponent } from './components/student-attendance-record-dialog/student-attendance-record-dialog.component';

@NgModule({
  declarations: [StudentAttendanceComponent, StudentAttendanceCrudComponent, StudentAttendanceInfoComponent, StudentAttendanceAddingStudentDialogComponent, StudentAttendanceRecordDialogComponent, StudentAttendancePaymentDialogComponent],
  imports: [
    CommonModule,
    StudentAttendanceRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ZippyModule,
    TableModule,
    ReactiveFormsModule,
    TranslateModule,
    StatusPipeModule,
    RoleModule,
    FilteringModule,
    MatProgressSpinnerModule,
    MatQuillModule,
    MatDatepickerModule,
    MatSelectModule,
    MatOptionModule,
    SearchbarInSelectOptionModule,
    TranslateApiModule,
    EmptyModule,
    MatProgressBarModule,
    MatTableModule,
    NameModule,
    StaticFileModule,
    MatDividerModule,
    MatDialogModule,
    KhmerDateModule,
    MatCheckboxModule,
    MatTooltipModule,
    AttendanceCountModule
  ]
})
export class StudentAttendanceModule {}

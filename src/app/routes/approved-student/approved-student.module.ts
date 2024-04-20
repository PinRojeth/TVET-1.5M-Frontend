import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { ApprovedStudentRoutingModule } from './approved-student-routing.module';
import { StudentApprovedEditingComponent } from './components/student-approved-editing/student-approved-editing.component';
import { StudentApprovedComponent } from './components/student-approved/student-approved.component';
import { StudentFinishAttendanceCreatingComponent } from './components/student-finish-attendance-creating/student-finish-attendance-creating.component';
import { StudentFinishAttendanceComponent } from './components/student-finish-attendance/student-finish-attendance.component';
import { StudentFinishDetailComponent } from './components/student-finish-detail/student-finish-detail.component';
import { StudentFinishTabComponent } from './components/student-finish-tab/student-finish-tab.component';
import { StudentFinishTimelineComponent } from './components/student-finish-timeline/student-finish-timeline.component';
import { StudentFinishComponent } from './components/student-finish/student-finish.component';
import { StudentRequestQuitDialogComponent } from './components/student-request-quit-dialog/student-request-quit-dialog.component';

import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule, NativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { AddressModule } from 'src/app/shares/address/address.module';
import { FileModule } from 'src/app/shares/file/file.module';
import { FilteringModule } from 'src/app/shares/filtering/filtering.module';
import { ImageDisplayModule } from 'src/app/shares/image-display/image-display.module';
import { KhmerDateModule } from 'src/app/shares/khmer-date/khmer-date.module';
import { NameModule } from 'src/app/shares/name/name.module';
import { PoorIdAddingModule } from 'src/app/shares/poor-id-adding/poor-id-adding.module';
import { RoleModule } from 'src/app/shares/role/role.module';
import { StaticFileModule } from 'src/app/shares/static-file/static-file.module';
import { StatusPipeModule } from 'src/app/shares/status-pipe/status-pipe.module';
import { TableModule } from 'src/app/shares/table/table.module';
import { TranslateApiModule } from 'src/app/shares/translate-api/translate-api.module';
import { UploaderModule } from 'src/app/shares/uploader/uploader.module';
import { ZippyModule } from 'src/app/shares/zippy/zippy.module';
import { AddUserDialogComponent } from './components/add-user-dialog/add-user-dialog.component';
import { StudentFinishAttedanceDetailDialogComponent } from './components/student-finish-attedance-detail-dialog/student-finish-attedance-detail-dialog.component';
import { StudentFinishChangeCourseDialogComponent } from './components/student-finish-change-course-dialog/student-finish-change-course-dialog.component';

@NgModule({
  declarations: [
    StudentApprovedComponent,
    StudentFinishComponent,
    StudentFinishDetailComponent,
    StudentFinishTimelineComponent,
    StudentFinishTabComponent,
    StudentRequestQuitDialogComponent,
    StudentFinishAttendanceComponent,
    StudentFinishAttendanceCreatingComponent,
    StudentApprovedEditingComponent,
    StudentFinishAttedanceDetailDialogComponent,
    AddUserDialogComponent,
    StudentFinishChangeCourseDialogComponent
  ],
  imports: [
    CommonModule,
    ApprovedStudentRoutingModule,
    TableModule,
    ZippyModule,
    FilteringModule,
    MatButtonModule,
    MatIconModule,
    StaticFileModule,
    NameModule,
    TranslateModule,
    TranslateApiModule,
    UploaderModule,
    StatusPipeModule,
    MatTabsModule,
    MatDialogModule,
    MatDividerModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    NativeDateModule,
    KhmerDateModule,
    MatTooltipModule,
    MatRadioModule,
    AddressModule,
    FileModule,
    RoleModule,
    ImageDisplayModule,
    MatRippleModule,
    PoorIdAddingModule
  ]
})
export class ApprovedStudentModule {}

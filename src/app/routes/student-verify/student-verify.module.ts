import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StudentVerifyComponent } from './components/student-verify/student-verify.component';
import { StudentVerifyRoutingModule } from './student-verify-routing.module';

import { ReactiveFormsModule } from '@angular/forms';
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
import { RoleModule } from 'src/app/shares/role/role.module';
import { StaticFileModule } from 'src/app/shares/static-file/static-file.module';
import { StatusPipeModule } from 'src/app/shares/status-pipe/status-pipe.module';
import { TableModule } from 'src/app/shares/table/table.module';
import { TranslateApiModule } from 'src/app/shares/translate-api/translate-api.module';
import { UploaderModule } from 'src/app/shares/uploader/uploader.module';
import { ZippyModule } from 'src/app/shares/zippy/zippy.module';
import { StudentVerifyTabComponent } from './components/student-verify-tab/student-verify-tab.component';
import { StudentVerifyDetailComponent } from './components/student-verify-detail/student-verify-detail.component';
import { StudentVerifyTimelineComponent } from './components/student-verify-timeline/student-verify-timeline.component';
import { StudentVerifyDetailRejectDialogComponent } from './components/student-verify-detail-reject-dialog/student-verify-detail-reject-dialog.component';
import { GeneralDepartmentVerifyComponent } from './components/general-department-verify/general-department-verify.component';
import { GeneralDepartmentVerifyDetailComponent } from './components/general-department-verify-detail/general-department-verify-detail.component';
import { GeneralDepartmentVerifyTabComponent } from './components/general-department-verify-tab/general-department-verify-tab.component';
import { GeneralDepartmentVerifyTimelineComponent } from './components/general-department-verify-timeline/general-department-verify-timeline.component';


@NgModule({
  declarations: [
    StudentVerifyComponent,
    StudentVerifyTabComponent,
    StudentVerifyDetailComponent,
    StudentVerifyTimelineComponent,
    StudentVerifyDetailRejectDialogComponent,
    GeneralDepartmentVerifyComponent,
    GeneralDepartmentVerifyDetailComponent,
    GeneralDepartmentVerifyTabComponent,
    GeneralDepartmentVerifyTimelineComponent
  ],
  imports: [
    CommonModule,
    StudentVerifyRoutingModule,
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
    MatRippleModule
  ]
})
export class StudentVerifyModule { }

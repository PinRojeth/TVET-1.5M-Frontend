import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AttendanceRoutingModule } from './attendance-routing.module';
import { AttendanceRecordComponent } from './components/attendance-record/attendance-record.component';
import { AttendanceSubmitComponent } from './components/attendance-submit/attendance-submit.component';

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
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { EmptyModule } from 'src/app/shares/empty/empty.module';
import { FilteringModule } from 'src/app/shares/filtering/filtering.module';
import { KhmerDateModule } from 'src/app/shares/khmer-date/khmer-date.module';
import { MatQuillModule } from 'src/app/shares/mat-quill/mat-quill-module';
import { NameModule } from 'src/app/shares/name/name.module';
import { PaginationModule } from 'src/app/shares/pagination/pagination.module';
import { SearchbarInSelectOptionModule } from 'src/app/shares/searchbar-in-select-option/searchbar-in-select-option.module';
import { StaticFileModule } from 'src/app/shares/static-file/static-file.module';
import { TableModule } from 'src/app/shares/table/table.module';
import { TranslateApiModule } from 'src/app/shares/translate-api/translate-api.module';
import { ZippyModule } from 'src/app/shares/zippy/zippy.module';
import { RoleModule } from '../../shares/role/role.module';
import { StatusPipeModule } from '../../shares/status-pipe/status-pipe.module';
import { AttendanceRecordCrudComponent } from './components/attendance-record-crud/attendance-record-crud.component';
import { AttendanceRecordInfoComponent } from './components/attendance-record-info/attendance-record-info.component';
import { AttendanceSubmitAddingStudentDialogComponent } from './components/attendance-submit-adding-student-dialog/attendance-submit-adding-student-dialog.component';
import { AttendanceSubmitCrudComponent } from './components/attendance-submit-crud/attendance-submit-crud.component';
import { AttendanceSubmitInfoComponent } from './components/attendance-submit-info/attendance-submit-info.component';
import { AttendanceSubmitPaymentDialogComponent } from './components/attendance-submit-payment-dialog/attendance-submit-payment-dialog.component';
import { AttendanceSubmitViewInfoDialogComponent } from './components/attendance-submit-view-info-dialog/attendance-submit-view-info-dialog.component';
import { AddRemoveAllPipe } from './pipes/add-remove-all.pipe';

@NgModule({
  declarations: [AttendanceRecordComponent, AttendanceSubmitComponent, AttendanceRecordCrudComponent, AttendanceSubmitCrudComponent, AttendanceRecordInfoComponent, AttendanceSubmitAddingStudentDialogComponent, AttendanceSubmitViewInfoDialogComponent, AttendanceSubmitInfoComponent, AttendanceSubmitPaymentDialogComponent, AddRemoveAllPipe],
  imports: [
    CommonModule,
    AttendanceRoutingModule,
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
    TranslateApiModule,
    PaginationModule
  ]
})
export class AttendanceModule {}

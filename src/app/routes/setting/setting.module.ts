import { CommonModule } from '@angular/common';
import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';

import { SettingRoutingModule } from './setting-routing.module';

import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { AddressModule } from 'src/app/shares/address/address.module';
import { FilteringModule } from 'src/app/shares/filtering/filtering.module';
import { NameModule } from 'src/app/shares/name/name.module';
import { RoleModule } from 'src/app/shares/role/role.module';
import { SearchbarInSelectOptionModule } from 'src/app/shares/searchbar-in-select-option/searchbar-in-select-option.module';
import { StatusPipeModule } from 'src/app/shares/status-pipe/status-pipe.module';
import { TableModule } from 'src/app/shares/table/table.module';
import { TranslateApiModule } from 'src/app/shares/translate-api/translate-api.module';
import { UploaderModule } from 'src/app/shares/uploader/uploader.module';
import { ZippyModule } from 'src/app/shares/zippy/zippy.module';
import { AccountSettingEditingComponent } from './components/account-setting-editing/account-setting-editing.component';
import { AccountSettingComponent } from './components/account-setting/account-setting.component';
import { CmsComponent } from './components/cms/cms.component';
import { CmsEditComponent } from './components/cms-edit/cms-edit.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatQuillModule } from 'src/app/shares/mat-quill/mat-quill-module';
import { SafeHtmlModule } from 'src/app/shares/inner-html/safe-html/safe-html.module';
import { ShiftComponent } from './components/shift/shift.component';
import { CreateShiftComponent } from './components/create-shift/create-shift.component';
import { ShiftInfoComponent } from './components/shift-info/shift-info.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TokenComponent } from './components/token/token.component';
import { TokenEditComponent } from './components/token-edit/token-edit.component';
import { DepartmentComponent } from './components/department/department.component';
import { DepartmentInfoComponent } from './components/department-info/department-info.component';
import { CreateDepartmentComponent } from './components/create-department/create-department.component';

@NgModule({
  declarations: [AccountSettingComponent, AccountSettingEditingComponent, CmsComponent, CmsEditComponent, ShiftComponent, CreateShiftComponent, ShiftInfoComponent, TokenComponent, TokenEditComponent, DepartmentComponent, DepartmentInfoComponent, CreateDepartmentComponent],
  imports: [
    CommonModule,
    SettingRoutingModule,
    MatButtonModule,
    MatIconModule,
    TableModule,
    MatTooltipModule,
    ReactiveFormsModule,
    FilteringModule,
    SearchbarInSelectOptionModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    ZippyModule,
    StatusPipeModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    UploaderModule,
    RoleModule,
    TranslateModule,
    NameModule,
    TranslateApiModule,
    AddressModule,
    MatDividerModule,
    MatQuillModule,
    SafeHtmlModule,
    MatCheckboxModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class SettingModule {}

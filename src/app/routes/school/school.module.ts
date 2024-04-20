import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchoolRoutingModule } from './school-routing.module';
import { SchoolListComponent } from './components/school-list/school-list.component';
import { TableModule } from 'src/app/shares/table/table.module';
import { ZippyModule } from 'src/app/shares/zippy/zippy.module';
import { FilteringModule } from 'src/app/shares/filtering/filtering.module';
import { TranslateModule } from '@ngx-translate/core';
import { StaticFileModule } from 'src/app/shares/static-file/static-file.module';
import { SchoolOperationComponent } from './components/school-operation/school-operation.component';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { UploaderModule } from 'src/app/shares/uploader/uploader.module';
import { SearchbarInSelectOptionModule } from 'src/app/shares/searchbar-in-select-option/searchbar-in-select-option.module';
import { MatSelectModule } from '@angular/material/select';
import { TranslateApiModule } from 'src/app/shares/translate-api/translate-api.module';
import { SchoolInfoComponent } from './components/school-info/school-info.component';
import { RoleModule } from 'src/app/shares/role/role.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';


@NgModule({
  declarations: [
    SchoolListComponent,
    SchoolOperationComponent,
    SchoolInfoComponent
  ],
  imports: [
    CommonModule,
    SchoolRoutingModule,
    TableModule,
    ZippyModule,
    FilteringModule,
    TranslateModule,
    StaticFileModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatInputModule,
    MatProgressSpinnerModule,
    UploaderModule,
    SearchbarInSelectOptionModule,
    MatSelectModule,
    TranslateApiModule,
    RoleModule,
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class SchoolModule { }

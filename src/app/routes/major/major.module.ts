import { CommonModule } from '@angular/common';
import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslateModule } from '@ngx-translate/core';
import { FilteringModule } from 'src/app/shares/filtering/filtering.module';
import { MatQuillModule } from 'src/app/shares/mat-quill/mat-quill-module';
import { RoleModule } from 'src/app/shares/role/role.module';
import { TableModule } from 'src/app/shares/table/table.module';
import { ZippyModule } from 'src/app/shares/zippy/zippy.module';
import { MajorInfoComponent } from './components/major-info/major-info.component';
import { MajorListComponent } from './components/major-list/major-list.component';
import { MajorOperationComponent } from './components/major-operation/major-operation.component';
import { MajorRoutingModule } from './major-routing.module';
import { SearchbarInSelectOptionModule } from 'src/app/shares/searchbar-in-select-option/searchbar-in-select-option.module';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

@NgModule({
  declarations: [MajorListComponent, MajorOperationComponent, MajorInfoComponent],
  imports: [
    CommonModule,
    MajorRoutingModule,
    TableModule,
    ZippyModule,
    FilteringModule,
    TranslateModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatQuillModule,
    RoleModule,
    SearchbarInSelectOptionModule,
    MatSelectModule,
    MatOptionModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class MajorModule {}

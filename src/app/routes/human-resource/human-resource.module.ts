import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule } from '@ngx-translate/core';
import { AddressModule } from 'src/app/shares/address/address.module';
import { FilteringModule } from 'src/app/shares/filtering/filtering.module';
import { NameModule } from 'src/app/shares/name/name.module';
import { RoleModule } from 'src/app/shares/role/role.module';
import { SearchbarInSelectOptionModule } from 'src/app/shares/searchbar-in-select-option/searchbar-in-select-option.module';
import { StaticFileModule } from 'src/app/shares/static-file/static-file.module';
import { StatusPipeModule } from 'src/app/shares/status-pipe/status-pipe.module';
import { TableModule } from 'src/app/shares/table/table.module';
import { TranslateApiModule } from 'src/app/shares/translate-api/translate-api.module';
import { UploaderModule } from 'src/app/shares/uploader/uploader.module';
import { ZippyModule } from 'src/app/shares/zippy/zippy.module';
import { HumanResourceInfoComponent } from './components/human-resource-info/human-resource-info.component';
import { HumanResourceListComponent } from './components/human-resource-list/human-resource-list.component';
import { HumanResourceOperationComponent } from './components/human-resource-operation/human-resource-operation.component';
import { HumanResourceRoutingModule } from './human-resource-routing.module';


@NgModule({
  declarations: [
    HumanResourceListComponent,
    HumanResourceOperationComponent,
    HumanResourceInfoComponent
  ],
  imports: [
    CommonModule,
    HumanResourceRoutingModule,
    TranslateModule,
    TableModule,
    ZippyModule,
    FilteringModule,
    StaticFileModule,
    NameModule,
    RoleModule,
    StatusPipeModule,
    UploaderModule,
    SearchbarInSelectOptionModule,
    AddressModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatNativeDateModule,
    MatDatepickerModule,
    TranslateApiModule
  ]
})
export class HumanResourceModule { }

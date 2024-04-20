import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule } from '@ngx-translate/core';
import { AddressModule } from 'src/app/shares/address/address.module';
import { FileModule } from 'src/app/shares/file/file.module';
import { FilteringModule } from 'src/app/shares/filtering/filtering.module';
import { ImageDisplayModule } from 'src/app/shares/image-display/image-display.module';
import { NameModule } from 'src/app/shares/name/name.module';
import { PoorIdAddingModule } from 'src/app/shares/poor-id-adding/poor-id-adding.module';
import { RoleModule } from 'src/app/shares/role/role.module';
import { StaticFileModule } from 'src/app/shares/static-file/static-file.module';
import { StatusPipeModule } from 'src/app/shares/status-pipe/status-pipe.module';
import { TableModule } from 'src/app/shares/table/table.module';
import { TranslateApiModule } from 'src/app/shares/translate-api/translate-api.module';
import { UploaderModule } from 'src/app/shares/uploader/uploader.module';
import { ZippyModule } from 'src/app/shares/zippy/zippy.module';
import { CreatePendingComponent } from './components/create-pending/create-pending.component';
import { PendingInfoComponent } from './components/pending-info/pending-info.component';
import { PendingListComponent } from './components/pending-list/pending-list.component';
import { PendingOperationComponent } from './components/pending-operation/pending-operation.component';
import { RejectedInfoComponent } from './components/rejected-info/rejected-info.component';
import { RejectedListComponent } from './components/rejected-list/rejected-list.component';
import { StudentRequestEditingComponent } from './components/student-request-editing/student-request-editing.component';
import { StudentRequestsRoutingModule } from './student-requests-routing.module';

@NgModule({
  declarations: [
    PendingListComponent,
    RejectedListComponent,
    PendingInfoComponent,
    RejectedInfoComponent,
    PendingOperationComponent,
    CreatePendingComponent,
    StudentRequestEditingComponent
  ],
  imports: [
    CommonModule,
    StudentRequestsRoutingModule,
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
    FileModule,
    RoleModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    StatusPipeModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatMenuModule,
    MatCheckboxModule,
    AddressModule,
    MatRadioModule,
    ImageDisplayModule,
    MatRippleModule,
    PoorIdAddingModule
  ]
})
export class StudentRequestsModule {}

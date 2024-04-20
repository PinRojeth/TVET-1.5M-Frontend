import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IdPoorRequestRoutingModule } from './id-poor-request-routing.module';
import { IdPoorRquestComponent } from './components/id-poor-rquest/id-poor-rquest.component';
import { IdPoorRquestInfoComponent } from './components/id-poor-rquest-info/id-poor-rquest-info.component';
import { TableModule } from 'src/app/shares/table/table.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ZippyModule } from 'src/app/shares/zippy/zippy.module';
import { FilteringModule } from 'src/app/shares/filtering/filtering.module';
import { TranslateApiModule } from "../../shares/translate-api/translate-api.module";
import { StaticFileModule } from "../../shares/static-file/static-file.module";
import { NameModule } from "../../shares/name/name.module";
import { MatTableModule } from '@angular/material/table';
import { RoleModule } from "../../shares/role/role.module";
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { ImageDisplayModule } from 'src/app/shares/image-display/image-display.module';
import { UploaderModule } from 'src/app/shares/uploader/uploader.module';
import { FileModule } from 'src/app/shares/file/file.module';
import { StatusPipeModule } from "../../shares/status-pipe/status-pipe.module";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
    declarations: [
        IdPoorRquestComponent,
        IdPoorRquestInfoComponent
    ],
    imports: [
        CommonModule,
        IdPoorRequestRoutingModule,
        TableModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatInputModule,
        ZippyModule,
        FilteringModule,
        TranslateApiModule,
        StaticFileModule,
        NameModule,
        MatTableModule,
        RoleModule,
        TranslateModule,
        MatIconModule,
        ImageDisplayModule,
        UploaderModule,
        FileModule,
        StatusPipeModule,
        MatProgressSpinnerModule
    ]
})
export class IdPoorRequestModule { }

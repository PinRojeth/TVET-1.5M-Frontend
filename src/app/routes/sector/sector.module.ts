import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SectorRoutingModule } from './sector-routing.module';
import { SectorComponent } from './components/sector/sector.component';
import { CreateSectorComponent } from './components/create-sector/create-sector.component';
import { MatInputModule } from '@angular/material/input';
import { TableModule } from 'src/app/shares/table/table.module';
import { ZippyModule } from 'src/app/shares/zippy/zippy.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { FilteringModule } from 'src/app/shares/filtering/filtering.module';
import { MatButtonModule } from '@angular/material/button';
import { RoleModule } from "../../shares/role/role.module";
import { TranslateModule } from '@ngx-translate/core';
import { SectorInfoComponent } from './components/sector-info/sector-info.component';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    SectorComponent,
    CreateSectorComponent,
    SectorInfoComponent
  ],
  imports: [
    CommonModule,
    SectorRoutingModule,
    MatInputModule,
    TableModule,
    ZippyModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FilteringModule,
    MatButtonModule,
    MatInputModule,
    RoleModule,
    TranslateModule,
    MatIconModule,
    MatProgressSpinnerModule
  ]
})
export class SectorModule { }

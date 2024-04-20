import { CommonModule } from '@angular/common';
import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { AddressModule } from './../../shares/address/address.module';

import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import { DateTimeModule } from 'src/app/shares/date-time/date-time.module';
import { FileModule } from 'src/app/shares/file/file.module';
import { FilteringModule } from 'src/app/shares/filtering/filtering.module';
import { NameModule } from 'src/app/shares/name/name.module';
import { PaginationModule } from 'src/app/shares/pagination/pagination.module';
import { StaticFileModule } from 'src/app/shares/static-file/static-file.module';
import { StatusPipeModule } from 'src/app/shares/status-pipe/status-pipe.module';
import { TableModule } from 'src/app/shares/table/table.module';
import { TranslateApiModule } from 'src/app/shares/translate-api/translate-api.module';
import { ZippyModule } from 'src/app/shares/zippy/zippy.module';
import { CountUpDirective } from './components/count-up.directive';
import { HomeComponent } from './components/home/home.component';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  declarations: [HomeComponent, CountUpDirective],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatSelectModule,
    MatRadioModule,
    FilteringModule,
    MatTableModule,
    PaginationModule,
    NameModule,
    DateTimeModule,
    TableModule,
    ZippyModule,
    ReactiveFormsModule,
    TranslateModule,
    AddressModule,
    FilteringModule,
    FileModule,
    MatDatepickerModule,
    StatusPipeModule,
    TranslateApiModule,
    StaticFileModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class HomeModule {
  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIconSet(
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/svg-icon-set.svg')
    );
  }
}

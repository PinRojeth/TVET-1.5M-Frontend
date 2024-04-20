/* eslint-disable prettier/prettier */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ScrollingModule } from '@angular/cdk/scrolling';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { DomSanitizer } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import { TableStatusPipe } from '../status-pipe/pipes/table-status.pipe';
import { FilterComponent } from './components/filter/filter.component';
import { SelectionFilterComponent } from './components/selection-filter/selection-filter.component';
import { FilteringRoutingModule } from './filtering-routing.module';
import { TranslateStatusPipe } from '../status-pipe/pipes/translate-status.pipe';
import { YearDateComponent } from './components/year-date/year-date.component';
import { MonthDateComponent } from './components/month-date/month-date.component';
import { ScholarshipStatusPipe } from '../status-pipe/pipes/scholarship-status.pipe';

@NgModule({
  declarations: [FilterComponent, SelectionFilterComponent, YearDateComponent, MonthDateComponent],
  imports: [
    CommonModule,
    FilteringRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatSelectModule,
    MatBadgeModule,
    MatExpansionModule,
    ScrollingModule,
    MatListModule,
    MatChipsModule,
    FormsModule,
    MatRadioModule,
    MatRippleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  exports: [FilterComponent, SelectionFilterComponent],
  providers: [TableStatusPipe, TranslateStatusPipe, ScholarshipStatusPipe]
})
export class FilteringModule {
  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIconSet(
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/action-icons.svg')
    );
  }
}

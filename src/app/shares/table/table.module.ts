import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { TableComponent } from './components/table.component';
import { MatIconModule } from '@angular/material/icon';
import { DataPropertyGetterPipe } from './data-property-getter-pipe/data-property-getter.pipe';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { StaticFileModule } from '../static-file/static-file.module';
import { NameModule } from '../name/name.module';
import { EmptyModule } from '../empty/empty.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { PaginationModule } from '../pagination/pagination.module';
import { ActionComponent } from './action/action.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { TableHeaderPipe } from './pipes/table-header.pipe';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [TableComponent, DataPropertyGetterPipe, ActionComponent, TableHeaderPipe],
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    MatButtonModule,
    MatSortModule,
    MatFormFieldModule,
    NameModule,
    StaticFileModule,
    EmptyModule,
    MatProgressBarModule,
    PaginationModule,
    MatMenuModule,
    MatTooltipModule,
    RouterModule,
    TranslateModule,
    DragDropModule,
  ],

  exports: [TableComponent, ActionComponent, TableHeaderPipe]
})
export class TableModule { }

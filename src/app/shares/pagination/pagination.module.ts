import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './pagination.component';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [PaginationComponent],
  imports: [CommonModule, MatSelectModule, MatOptionModule, MatIconModule, TranslateModule],
  exports: [PaginationComponent]
})
export class PaginationModule { }

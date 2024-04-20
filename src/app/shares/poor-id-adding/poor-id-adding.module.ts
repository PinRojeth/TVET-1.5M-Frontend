import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslateModule } from '@ngx-translate/core';
import { NameModule } from '../name/name.module';
import { TableModule } from '../table/table.module';
import { ZippyModule } from '../zippy/zippy.module';
import { PoorIdInputComponent } from './components/poor-id-input/poor-id-input.component';

@NgModule({
  declarations: [PoorIdInputComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    TranslateModule,
    TableModule,
    NameModule,
    ZippyModule,
    MatFormFieldModule,
    ReactiveFormsModule
  ],
  exports: [PoorIdInputComponent]
})
export class PoorIdAddingModule {}

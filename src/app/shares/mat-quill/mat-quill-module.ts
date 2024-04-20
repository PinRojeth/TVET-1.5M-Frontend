import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { QuillModule } from 'ngx-quill';
import { MatQuillComponent } from './mat-quill';

@NgModule({
  declarations: [MatQuillComponent],
  exports: [MatQuillComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, QuillModule, MatFormFieldModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MatQuillModule {}

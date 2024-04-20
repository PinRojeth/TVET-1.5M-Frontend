import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslateModule } from '@ngx-translate/core';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { FileModule } from '../file/file.module';
import { PdfDisplayComponent } from './components/pdf-display/pdf-display.component';
import { PreviewPdfDirective } from './preview-pdf.directive';

@NgModule({
  declarations: [PreviewPdfDirective, PdfDisplayComponent],
  imports: [
    CommonModule,
    PdfViewerModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    TranslateModule,
    MatButtonModule,
    MatIconModule,
    FileModule
  ],
  exports: [PreviewPdfDirective, PdfDisplayComponent]
})
export class PdfDisplayModule {}

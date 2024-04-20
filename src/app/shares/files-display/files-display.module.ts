import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PdfDisplayComponent } from './components/pdf-display/pdf-display.component';
import { PreviewPdfDirective } from './directives/preview-pdf.directive';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { PreviewOfficeDirective } from './directives/preview-office.directive';
import { OfficeDisplayComponent } from './components/office-display/office-display.component';
import { SafeUrlModule } from '../safe-url/safe-url.module';
import { VideoDisplayComponent } from './components/video-display/video-display.component';
import { PreviewVideoDirective } from './directives/preview-video.directive';
import { FilesDisplayDirective } from './directives/files-display.directive';



@NgModule({
  declarations: [
    PdfDisplayComponent,
    PreviewPdfDirective,
    PreviewOfficeDirective,
    OfficeDisplayComponent,
    VideoDisplayComponent,
    PreviewVideoDirective,
    FilesDisplayDirective
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    NgxExtendedPdfViewerModule,
    SafeUrlModule
  ],
  exports: [
    PdfDisplayComponent,
    PreviewPdfDirective,
    PreviewOfficeDirective,
    OfficeDisplayComponent,
    VideoDisplayComponent,
    PreviewVideoDirective,
    FilesDisplayDirective
  ]
})
export class FilesDisplayModule { }

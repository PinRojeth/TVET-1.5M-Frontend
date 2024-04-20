import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaticFilePipe } from './pipes/static-file.pipe';
import { FileExtensionPipe } from './pipes/file-type.pipe';

@NgModule({
  declarations: [StaticFilePipe, FileExtensionPipe],
  imports: [CommonModule],
  exports: [StaticFilePipe, FileExtensionPipe]
})
export class StaticFileModule { }

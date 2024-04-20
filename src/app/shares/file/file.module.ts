import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Base64ImagePipe } from './base64-image.pipe';
import { DownloadDirective } from './download.directive';
import { SizePipe } from './size.pipe';

@NgModule({
  declarations: [SizePipe, DownloadDirective, Base64ImagePipe],
  imports: [CommonModule],
  exports: [SizePipe, DownloadDirective, Base64ImagePipe]
})
export class FileModule {}

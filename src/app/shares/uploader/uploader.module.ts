import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TranslateModule } from '@ngx-translate/core';
import { ImageDisplayModule } from '../image-display/image-display.module';
import { NameModule } from '../name/name.module';
import { RoleModule } from '../role/role.module';
import { StaticFilePipe } from '../static-file/pipes/static-file.pipe';
import { StaticFileModule } from '../static-file/static-file.module';
import { FileAttachmentComponent } from './components/file-attachment/file-attachment.component';
import { FileUploaderComponent } from './components/file-uploader/file-uploader.component';
import { ImageUploaderComponent } from './components/image-uploader/image-uploader.component';
import { SchoolImageUploaderComponent } from './components/school-image-uploader/school-image-uploader.component';

@NgModule({
  declarations: [FileUploaderComponent, FileAttachmentComponent, ImageUploaderComponent, SchoolImageUploaderComponent],
  imports: [
    CommonModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatProgressBarModule,
    ImageDisplayModule,
    StaticFileModule,
    NameModule,
    RoleModule,
    TranslateModule
  ],
  exports: [FileUploaderComponent, FileAttachmentComponent, ImageUploaderComponent, SchoolImageUploaderComponent],
  providers: [StaticFilePipe]
})
export class UploaderModule {}

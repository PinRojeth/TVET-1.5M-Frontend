import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageDisplayComponent } from './image-display.component';
import { PreviewFileDirective } from './preview-file.directive';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [
    ImageDisplayComponent,
    PreviewFileDirective
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule
  ],
  exports: [ImageDisplayComponent, PreviewFileDirective]
})
export class ImageDisplayModule { }

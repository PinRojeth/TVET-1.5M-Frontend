import { ComponentType } from '@angular/cdk/portal';
import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../confirm-dialog/components/confirm-dialog/confirm-dialog.component';
import { OfficeDisplayComponent } from '../components/office-display/office-display.component';
import { PdfDisplayComponent } from '../components/pdf-display/pdf-display.component';
import { VideoDisplayComponent } from '../components/video-display/video-display.component';

interface ViewFile {
  url: string;
  extension: string;
}

@Directive({
  selector: '[appFilesDisplay]'
})
export class FilesDisplayDirective {

  dialogComponent: ComponentType<any>;

  @Input('appFilesDisplay') data: ViewFile;
  @HostListener('click', ['$event'])
  clickEvent() {

    if (this.data) {

      if (this.data.extension == "pdf") {
        this.dialogComponent = PdfDisplayComponent;
      }
      else if (this.data.extension == "mp4") {
        this.dialogComponent = VideoDisplayComponent;
      }
      else if (
        this.data.extension == "msword"
        || this.data.extension == "vnd.ms-powerpoint"
        || this.data.extension == "vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
        this.dialogComponent = OfficeDisplayComponent;
      }
      else {

        // cannot preview file
        this.dialog.open(ConfirmDialogComponent, {
          width: '400px',
          data: {
            icon: 'assets/icons/document-unknown.svg',
            title: 'dialog.cannot_preview_file'
          }
        });
        return;
      }

      this.dialog.open(this.dialogComponent, {
        width: '800px',
        disableClose: false,
        data: this.data.extension == "mp4" ? { src: this.data.url } : this.data.url,
        panelClass: 'transparent',
        backdropClass: 'backdropBackground'
      });
    }
  }

  constructor(el: ElementRef, private dialog: MatDialog) {
    el.nativeElement.style.cursor = 'pointer';
  }

}

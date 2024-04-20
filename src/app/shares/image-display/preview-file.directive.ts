import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ImageDisplayComponent } from './image-display.component';

@Directive({
  selector: '[appPreviewFile]'
})
export class PreviewFileDirective {

  @Input('appPreviewFile') src: string = '';
  @HostListener('click', ['$event'])
  clickEvent() {
    if (this.src != '') {
      this.dialog.open(ImageDisplayComponent, {
        minWidth: '300px',
        disableClose: false,
        data: this.src,
        panelClass: 'transparent',
        backdropClass: 'backdropBackground'
      });
    }
  }
  constructor(el: ElementRef, private dialog: MatDialog) {
    el.nativeElement.style.cursor = 'pointer';
  }

}

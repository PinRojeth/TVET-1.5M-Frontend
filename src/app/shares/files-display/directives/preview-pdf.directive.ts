import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PdfDisplayComponent } from '../components/pdf-display/pdf-display.component';

@Directive({
  selector: '[appPreviewPdf]'
})
export class PreviewPdfDirective {

  @Input('appPreviewPdf') src: string = '';
  @HostListener('click', ['$event'])
  clickEvent() {
    if (this.src != '') {
      this.dialog.open(PdfDisplayComponent, {
        width: '800px',
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

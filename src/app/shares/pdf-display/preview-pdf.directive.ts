import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PdfDisplayComponent } from './components/pdf-display/pdf-display.component';

@Directive({
  selector: '[appPreviewPdf]'
})
export class PreviewPdfDirective {
  @Input('appPreviewPdf') src: string = '';
  @Input() pdfName: string = 'download';

  @HostListener('click', ['$event'])
  clickEvent() {
    if (this.src != '') {
      this.dialog.open(PdfDisplayComponent, {
        minWidth: '895px',
        disableClose: false,
        data: {
          file: this.src,
          fileName: this.pdfName
        }
      });
    }
  }
  constructor(el: ElementRef, private dialog: MatDialog) {
    el.nativeElement.style.cursor = 'pointer';
  }
}

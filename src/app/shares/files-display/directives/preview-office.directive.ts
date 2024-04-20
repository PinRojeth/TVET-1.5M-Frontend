import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OfficeDisplayComponent } from '../components/office-display/office-display.component';

@Directive({
  selector: '[appPreviewOffice]'
})
export class PreviewOfficeDirective {

  @Input('appPreviewOffice') src: string = '';
  @HostListener('click', ['$event'])
  clickEvent() {
    if (this.src != '') {
      this.dialog.open(OfficeDisplayComponent, {
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

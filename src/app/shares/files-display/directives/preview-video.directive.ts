import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { VideoDisplayComponent } from '../components/video-display/video-display.component';

@Directive({
  selector: '[appPreviewVideo]'
})
export class PreviewVideoDirective {

  @Input('appPreviewVideo') src: string = '';
  @HostListener('click', ['$event'])
  clickEvent() {
    if (this.src != '') {
      this.dialog.open(VideoDisplayComponent, {
        width: '800px',
        disableClose: false,
        data: { src: this.src },
        panelClass: 'transparent',
        backdropClass: 'backdropBackground'
      });
    }
  }
  constructor(el: ElementRef, private dialog: MatDialog) {
    el.nativeElement.style.cursor = 'pointer';
  }

}

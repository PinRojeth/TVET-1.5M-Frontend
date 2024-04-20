import { Directive, ElementRef, HostListener, Input, Renderer2, inject } from '@angular/core';
import { KhmerDatePipe } from '../khmer-date/khmer-date.pipe';

@Directive({
  selector: '[appDateInputTranslate]',
  providers: [KhmerDatePipe]
})
export class DateInputTranslateDirective {
  private readonly element = inject(ElementRef);
  private readonly khmerDatePipe = inject(KhmerDatePipe);

  @Input() appDateInputTranslate: string;

  @HostListener('dateChange') dateChange(): void {
    let date: Date = new Date(this.element.nativeElement.value);

    this.element.nativeElement.value = `${date.getDate()} ${this.khmerDatePipe.transform(
      date.getMonth(),
      'MMMM'
    )} ${date.getFullYear()}`;
  }
}

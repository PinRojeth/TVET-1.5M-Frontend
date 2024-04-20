import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appScrollToBottom]'
})
export class ScrollToBottomDirective {

  constructor() { }

  public scrollToBottom(_el: ElementRef) {
    const el: HTMLDivElement = _el.nativeElement;
    el.scrollTop = Math.max(0, el.scrollHeight - el.offsetHeight);
  }
}

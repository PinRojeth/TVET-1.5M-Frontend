import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'safeHtml'
})
export class SafeHtmlPipe implements PipeTransform {

  // transform(value: unknown, ...args: unknown[]): unknown {
  //   return null;
  // }

  constructor(protected _sanitizer: DomSanitizer) {}
  transform(items): SafeHtml{
    return this._sanitizer.bypassSecurityTrustHtml(items);
  }

}

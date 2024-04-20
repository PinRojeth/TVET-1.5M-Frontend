import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appZippy]'
})
export class ZippyDirective {

  constructor(public templateRef: TemplateRef<any>) {}
  @Input('appZippy') columnName: string;
}

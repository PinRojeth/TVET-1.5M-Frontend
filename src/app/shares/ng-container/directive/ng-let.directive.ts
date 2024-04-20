import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

interface ILetContext<T> {
  ngLet: T;
}

@Directive({
  selector: '[ngLet]'
})
export class NgLetDirective<T> {

  private context: ILetContext<T> = { ngLet: undefined };

  constructor(viewContainer: ViewContainerRef, templateRef: TemplateRef<ILetContext<T>>) {
    viewContainer.createEmbeddedView(templateRef, this.context);
  }

  @Input()
  set ngLet(value: T) {
    this.context.ngLet = value;
  }

}

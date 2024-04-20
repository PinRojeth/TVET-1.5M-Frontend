/* eslint-disable @angular-eslint/use-lifecycle-interface */
import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';
import { takeUntil } from 'rxjs';
import { Unsubscribe } from 'src/app/helpers/unsubscribe';

@Directive({
  selector: '[appCheckNameExisted]'
})
export class CheckNameExistedDirective extends Unsubscribe {
  @Input() appCheckNameExisted: { service: any; serviceName?: string };
  formControlName: string;
  timer: ReturnType<typeof setTimeout>;

  @HostListener('keyup', ['$event']) onChange() {
    this.onInputChange();
  }

  constructor(private el: ElementRef, private rootForm: FormGroupDirective) {
    super();
  }

  ngAfterViewInit(): void {
    let input: HTMLInputElement = this.el.nativeElement;
    let attribute: NamedNodeMap = input.attributes;
    this.formControlName = attribute.getNamedItem('formcontrolname')?.value;
  }

  onInputChange(): void {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.onCheck(this.rootForm.control.controls[this.formControlName]?.value), 500);
  }

  onCheck(value: string): void {
    this.appCheckNameExisted.service[this.appCheckNameExisted?.serviceName ?? 'checkExistedUser']({
      username: value
    })
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res: any) => {
        if (res.exist == true) {
          this.rootForm.control.controls[this.formControlName].setErrors({ nameExist: true });
        }
      });
  }
}

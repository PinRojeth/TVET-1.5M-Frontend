import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringUnderscore'
})
export class StringUnderscorePipe implements PipeTransform {
  transform(value: string): string {
    if (!!value) return value.replace(/ /g, '_').toLowerCase();
    else return value;
  }
}

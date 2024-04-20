import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeUnderscore'
})
export class RemoveUnderscorePipe implements PipeTransform {
  transform(name: string): string {
    return name?.replace(/_/g, ' ');
  }
}

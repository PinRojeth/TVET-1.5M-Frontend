import { Pipe, PipeTransform } from '@angular/core';
import { RoleId } from 'src/app/models/enums/enumConstant';

@Pipe({
  name: 'arrayRole'
})
export class ArrayRolePipe implements PipeTransform {
  private isNumber(value: string): boolean {
    let isNum = /^\d+$/.test(value);
    return isNum;
  }

  transform(value: typeof RoleId): Array<any> {
    return Object.keys(value)
      .map(name => {
        if (!this.isNumber(name) && name !== 'USER') {
          return {
            name,
            _id: value[name as keyof typeof value]
          };
        }
      })
      .filter(fil => fil);
  }
}

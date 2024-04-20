import { Pipe, PipeTransform } from '@angular/core';
import { RoleId } from 'src/app/models/enums/enumConstant';

@Pipe({
  name: 'rolePipe'
})
export class RolePipe implements PipeTransform {
  transform(role: number): string {
    if (role) {
      let str = RoleId[role];
      if (str) {
        let arr = str.split('_');
        // for (var i = 0; i < arr.length; i++) {
        //   arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1).toLowerCase();
        // }
        return arr.join(' ');
      } else return '--/--';
    }
  }
}

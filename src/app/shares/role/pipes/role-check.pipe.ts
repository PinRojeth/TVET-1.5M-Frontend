import { Pipe, PipeTransform } from '@angular/core';
import { RoleId } from 'src/app/models/enums/enumConstant';

@Pipe({
  name: 'roleCheck'
})
export class RoleCheckPipe implements PipeTransform {

  transform(roles: number): string {
    let roleString = '';
    if (roles === null || roles === 0) return roleString = 'All';

    for (let [key, value] of Object.entries(RoleId)) {
      if (parseInt(key) === roles) {
        roleString = value as string;
      }
    }

    return roleString;
  }

}

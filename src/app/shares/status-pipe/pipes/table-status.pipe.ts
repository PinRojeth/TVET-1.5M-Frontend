import { Pipe, PipeTransform } from '@angular/core';
import EnumConstant from 'src/app/models/enums/enumConstant';

@Pipe({
  name: 'tableStatus'
})
export class TableStatusPipe implements PipeTransform {
  transform(status: number): string {
    let statusString: string = '';

    switch (status) {
      case EnumConstant.ACTIVE:
        statusString = 'Active';
        break;
      case EnumConstant.INACTIVE:
        statusString = 'Inactive';
        break;
      case EnumConstant.DISABLED:
        statusString = 'Disabled';
        break;
      case EnumConstant.EXPIRED:
        statusString = 'Expired';
        break;
      case EnumConstant.REQUESTING:
        statusString = 'Requesting';
        break;
      default:
        statusString = statusString;
        break;
    }

    return statusString;
  }
}

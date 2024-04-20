import { Pipe, PipeTransform } from '@angular/core';
import EnumConstant from 'src/app/models/enums/enumConstant';

@Pipe({
  name: 'translateStatus'
})
export class TranslateStatusPipe implements PipeTransform {

  transform(status: number): string {
    let statusString: string = '';

    switch (status) {
      case EnumConstant.ACTIVE:
        statusString = 'enum_status.Active';
        break;
      case EnumConstant.INACTIVE:
        statusString = 'enum_status.Inactive';
        break;
      case EnumConstant.DISABLED:
        statusString = 'enum_status.Disabled';
        break;
      case EnumConstant.EXPIRED:
        statusString = 'enum_status.Expired';
        break;
      case EnumConstant.REQUESTING:
        statusString = 'enum_status.Pending';
        break;
      default:
        statusString = statusString;
        break;
    }

    return statusString;
  }

}

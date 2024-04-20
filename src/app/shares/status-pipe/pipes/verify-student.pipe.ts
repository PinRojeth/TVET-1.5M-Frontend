import { Pipe, PipeTransform } from '@angular/core';
import EnumConstant from 'src/app/models/enums/enumConstant';

@Pipe({
  name: 'verifyStudent'
})
export class VerifyStudentPipe implements PipeTransform {

  transform(status: number): string {
    let statusString: string = '';

    switch (status) {
      case EnumConstant.ACTIVE:
        statusString = 'ឯកភាព';
        break;

      case EnumConstant.REQUESTING:
        statusString = 'ស្នើសុំ';
        break;

      case EnumConstant.REJECT:
        statusString = 'មិនឯកភាព';
        break;

      default:
        statusString = statusString;
        break;
    }

    return statusString;
  }

}

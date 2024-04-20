import { Pipe, PipeTransform } from '@angular/core';
import EnumConstant from 'src/app/models/enums/enumConstant';

@Pipe({
  name: 'scholarshipStatus'
})
export class ScholarshipStatusPipe implements PipeTransform {

  transform(status: number): string {
    let statusString: string = '';

    switch (status) {
      case EnumConstant.ACTIVE:
        statusString = 'scholarship_status.active';
        break;
      case EnumConstant.REQUESTED:
        statusString = 'scholarship_status.requesting';
        break;
      case EnumConstant.CANCEL:
        statusString = 'scholarship_status.quit';
        break;
      case EnumConstant.REQUESTING:
        statusString = 'scholarship_status.request';
        break;
      case EnumConstant.REJECT:
        statusString = 'scholarship_status.reject';
        break;
      case EnumConstant.FINISH_STUDY:
        statusString = 'scholarship_status.finish_study';
        break;
      case EnumConstant.QUIT_BFORE_COURSE:
        statusString = 'scholarship_status.quit_before_course';
        break;
      case EnumConstant.QUIT_DURING_COURSE:
        statusString = 'scholarship_status.quit_during_course';
        break;
      default:
        statusString = statusString;
        break;
    }

    return statusString;
  }
}

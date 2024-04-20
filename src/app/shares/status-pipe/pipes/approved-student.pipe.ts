import { Pipe, PipeTransform } from '@angular/core';
import EnumConstant from 'src/app/models/enums/enumConstant';

@Pipe({
  name: 'approvedStudent'
})
export class ApprovedStudentPipe implements PipeTransform {
  transform(status: number): string {
    let statusString: string = '';

    switch (status) {
      case EnumConstant.ACTIVE:
        statusString = 'Approved';
        break;
      case EnumConstant.CANCEL:
        statusString = 'Quit';
        break;
      case EnumConstant.QUIT_BFORE_COURSE:
        statusString = 'Quit';
        break;
      case EnumConstant.QUIT_DURING_COURSE:
        statusString = 'Quit';
        break;
      case EnumConstant.REQUESTING:
        statusString = 'Requesting';
        break;

      case EnumConstant.REJECT:
        statusString = 'Rejected';
        break;

      case EnumConstant.DRAFT:
        statusString = 'Draft';
        break;
      
      case EnumConstant.FINISH_STUDY:
        statusString = 'Draft';
        break;

      case EnumConstant.INACTIVE:
        statusString = 'Empty';
        break;

      case EnumConstant.REQUESTED:
        statusString = 'Requesting';
        break;

      case EnumConstant.PENDING:
        statusString = 'Active';
        break;

      default:
        statusString = statusString;
        break;
    }

    return statusString;
  }
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'studentAttendance'
})
export class StudentAttendancePipe implements PipeTransform {
  transform(status: number): string {
    let statusString: string = '';

    switch (status) {
      case 1:
        statusString = 'status.requested';
        break;
      case 2:
        statusString = 'status.draft';
        break;

      default:
        statusString = statusString;
        break;
    }

    return statusString;
  }
}

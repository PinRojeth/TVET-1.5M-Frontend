import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'attendanceCount'
})
export class AttendanceCountPipe implements PipeTransform {
  transform(value: number, shift: number): number {
    if (!!value) {
      let result: number = value / shift;
      return result % 1 === 0 ? result : +result.toFixed(1);
    } else return 0;
  }
}

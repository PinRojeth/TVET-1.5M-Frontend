import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {
  transform(value: any): string {
    const d = new Date(parseInt(value, 10) * 1000); // .valueOf() === 'Invalid Date'
    if (isNaN(+d)) {
      return;
    }

    // Convert seconds to HH-MM
    const hm = d.toISOString().substr(11, 5);

    // Split HH:MM by (:)
    const a = hm.split(':');
    const h = parseInt(a[0], 10);

    const suffix = h >= 12 ? 'PM' : 'AM';

    const time = ((h + 11) % 12) + 1 + ':' + a[1] + ' ' + suffix;

    return time;
  }
}

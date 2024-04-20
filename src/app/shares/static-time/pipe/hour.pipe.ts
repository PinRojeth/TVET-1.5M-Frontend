import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'hour'
})
export class HourPipe implements PipeTransform {
    transform(value: any): string {
        if (value < 0) return 'N/A';
        var timestamp = value;
        // 2
        var hours = Math.floor(timestamp / 60 / 60);

        // 37
        var minutes = Math.floor(timestamp / 60) - (hours * 60);

        // 42
        var seconds = timestamp % 60;

        var timeString = hours.toString().padStart(2, '0') + ':' +
            minutes.toString().padStart(2, '0') + ':' +
            seconds.toString().padStart(2, '0');

        return timeString;

    }
}

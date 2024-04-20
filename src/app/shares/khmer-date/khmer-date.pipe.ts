import { formatDate } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'khmerDate'
})
export class KhmerDatePipe implements PipeTransform {
  transform(
    value: Date | string | number,
    style: 'MMMM' | 'MMMM yyyy' | 'dd MMMM yyyy' | 'full',
    lang?: string
  ): string {
    let dateFormat: string;
    if (value) {
      let date: Date = new Date(value);
      if (date?.toString() !== 'Invalid Date') {
        if (lang === 'en') return (dateFormat = formatDate(date, style, 'en-US'));
        else {
          switch (style) {
            case 'MMMM':
              dateFormat = isNaN(+value) ? this.khmerMonth(date.getMonth() + 1) : this.khmerMonth(+value);
              break;

            case 'dd MMMM yyyy':
              dateFormat =
                formatDate(date, 'dd', 'En-US') + ' ' + this.khmerMonth(date.getMonth() + 1) + ' ' + date.getFullYear();
              break;

            case 'MMMM yyyy':
              dateFormat = this.khmerMonth(date.getMonth() + 1) + ' ' + date.getFullYear();
              break;

            case 'full':
              dateFormat =
                'ថ្ងៃទី' +
                formatDate(date, 'dd', 'En-US') +
                ' ខែ' +
                this.khmerMonth(date.getMonth() + 1) +
                ' ឆ្នាំ' +
                date.getFullYear();
              break;

            default:
              dateFormat = 'Invalid Format';
              break;
          }
        }
      } else return (dateFormat = date?.toString());
    }
    return dateFormat ?? '--/--';
  }

  khmerMonth(value: number): string {
    const khmerMonthList = [
      { value: 1, name: 'មករា' },
      { value: 2, name: 'កុម្ភៈ' },
      { value: 3, name: 'មីនា' },
      { value: 4, name: 'មេសា' },
      { value: 5, name: 'ឧសភា' },
      { value: 6, name: 'មិថុនា' },
      { value: 7, name: 'កក្កដា' },
      { value: 8, name: 'សីហា' },
      { value: 9, name: 'កញ្ញា' },
      { value: 10, name: 'តុលា' },
      { value: 11, name: 'វិច្ឆិកា' },
      { value: 12, name: 'ធ្នូ' }
    ];

    let str: string = '';
    for (let i: number = 0; i < khmerMonthList.length; i++) {
      if (khmerMonthList[i].value === value) {
        str = khmerMonthList[i].name;
        return str;
      }
    }
  }
}

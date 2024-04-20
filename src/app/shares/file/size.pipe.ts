import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fileSize'
})
export class SizePipe implements PipeTransform {
  transform(bytes: number, decimalPoint?: number | undefined): string {
    bytes = bytes ?? 0;
    if (bytes == 0) return '0B';
    let k: number = 1000,
      dm: number = decimalPoint ?? 2,
      sizes: string[] = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
      i: number = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + sizes[i];
  }
}

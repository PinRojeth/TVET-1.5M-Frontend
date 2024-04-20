import { Pipe, PipeTransform } from '@angular/core';
/**
 * Transform value to icon base file type
 */
@Pipe({
  name: 'fileExtension'
})
export class FileExtensionPipe implements PipeTransform {

  transform(value: string) {
    let icon: string;
    switch (value) {
      case 'pdf':
        icon = 'pdf-ic'
        break;
      case 'svg+xml':
        icon = 'svg-ic'
        break;
      case 'jpeg':
        icon = 'jpeg-ic'
        break;
      case 'png':
        icon = 'jpeg-ic'
        break;
      case 'gif':
        icon = 'gif-ic'
        break;
      case 'mp4':
        icon = 'video-ic'
        break;
      case 'msword':
        icon = 'word-ic'
        break;
      case 'vnd.openxmlformats-officedocument.wordprocessingml.document':
        icon = 'word-ic'
        break;
      case 'vnd.ms-powerpoint':
        icon = 'vnd-ic'
        break;
      case 'vnd.openxmlformats-officedocument.presentationml.presentation':
        icon = 'vnd-ic'
        break;
      case 'vnd.ms-excel':
        icon = 'csv-ic'
        break;
      case 'vnd.openxmlformats-officedocument.spreadsheetml.sheet':
        icon = 'csv-ic'
        break;
      default:
        icon = 'other-ic'
        break;
    }

    return icon;
  }

}

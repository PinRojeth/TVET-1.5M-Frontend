import { Pipe, PipeTransform } from '@angular/core';
import { Student } from 'src/app/models/student';

@Pipe({
  name: 'addRemoveAllPipe'
})
export class AddRemoveAllPipe implements PipeTransform {
  transform(data: Student[]): boolean {
    let status: boolean;

    if (data?.length > 0) {
      const payload = data.filter(fil => !fil?.disabled);

      if (payload?.length > 0 && payload.every(value => value?.selected)) status = false;
      else status = true;
    }

    console.log(status);

    return status;
  }
}

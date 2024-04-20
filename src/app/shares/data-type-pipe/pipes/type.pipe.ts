import { Pipe, PipeTransform } from '@angular/core';
import { TypeEnum } from 'src/app/models/enums/enumConstant';


@Pipe({
  name: 'type'
})
export class TypePipe implements PipeTransform {

  transform(data_type: number): string {
    return TypeEnum[data_type];
  }

}

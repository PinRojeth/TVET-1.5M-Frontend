import { Pipe, PipeTransform } from '@angular/core';
import { TableColumn } from 'src/app/models/table-column';

@Pipe({
  name: 'tableHeader'
})
export class TableHeaderPipe implements PipeTransform {
  transform(value: TableColumn[], action?: boolean): TableColumn[] {
    if (action && value.filter(fil => fil.dataKey === 'action')?.length < 1) {
      value.push({
        name: 'table.action',
        dataKey: 'action',
        custom: true
      });
    } else {
      value = value.filter(fil => fil.dataKey !== 'action');
    }
    return value;
  }
}

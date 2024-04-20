import { Pipe, PipeTransform } from '@angular/core';
import { StudentDataReport } from 'src/app/models/report';

@Pipe({
  name: 'studentDataReportPipe'
})
export class StudentDataReportPipe implements PipeTransform {
  transform(data: StudentDataReport[], key: string): StudentDataReport | null {
    let result: StudentDataReport;
    if (!!key && !!data) result = data?.find(value => String(value._id) == String(key));
    return result ?? null;
  }
}

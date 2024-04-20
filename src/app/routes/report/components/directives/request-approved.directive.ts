import { Directive, HostListener, Input } from '@angular/core';
import { StudentRequestReport } from 'src/app/models/report';
import * as XLSX from 'xlsx';

const EXCEL_EXTENSION = '.xlsx';

@Directive({
  selector: '[appRequestApproved]'
})
export class RequestApprovedDirective {

  @Input('appRequestApproved') data: StudentRequestReport;

  constructor() { }

  @HostListener('click') onClick() {
    this.xlsx();
  }

  xlsx() {

    let requestBySchool = this.mapRequestBySchool();
    let requestByMajor = this.mapRequestByMajor();

    /* make the worksheet */
    var worksheet1 = XLSX.utils.json_to_sheet(requestBySchool);
    var worksheet2 = XLSX.utils.json_to_sheet(requestByMajor);

    /** generate khmer header */
    if (requestBySchool?.length > 0) {
      let count = 0;
      for (let key in requestBySchool[0]) {
        // increase the count
        ++count;
      }

      for (var C = 0; C <= count; ++C) {
        var address = XLSX.utils.encode_col(C) + "1"; // <-- first row, column number C
        if (!worksheet1[address]) continue;
        worksheet1[address].v = this.setKhmerHeader(worksheet1[address].v);
      }
    }

    if (requestByMajor?.length > 0) {
      let count = 0;
      for (let key in requestByMajor[0]) {
        // increase the count
        ++count;
      }
      
      for (var C = 0; C <= count; ++C) {
        var address = XLSX.utils.encode_col(C) + "1"; // <-- first row, column number C
        if (!worksheet2[address]) continue;
        worksheet2[address].v = this.setKhmerHeader(worksheet2[address].v);
      }
    }

    /* add to workbook */
    var workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet1, "Student Requests by School");
    XLSX.utils.book_append_sheet(workbook, worksheet2, "Student Requests by Major");

    /* generate an XLSX file */
    const fileName = 'Student Requests Report' + '_export_' + new Date().getTime() + EXCEL_EXTENSION;
    XLSX.writeFile(workbook, fileName);
  }

  mapRequestBySchool() {

    const row = this.data.requestBySchool;
    let result = [];
    for (let index = 0; index < row.length; index++) {
      const element = row[index];
      const item = {
        No: index + 1,
        SCHOOL: element.name,
        MALE: element.total_student,
        FEMALE: element.female
      };
      result.push(item);
    }

    return result;
  }

  mapRequestByMajor() {
    const row = this.data.requestByMajor;
    let result = [];
    for (let index = 0; index < row.length; index++) {
      const element = row[index];
      const item = {
        No: index + 1,
        MAJOR: element.name,
        MALE: element.total_student,
        FEMALE: element.female
      };
      result.push(item);
    }
    return result;
  }

  setKhmerHeader(title: string) {
    switch (title) {
      case 'SCHOOL':
        return 'គ្រឹះស្ថាន អ.ប.វ.';
      case 'MAJOR':
        return 'ជំនាញ';
      case 'MALE':
        return 'ប្រុស';
      case 'FEMALE':
        return 'ស្រី';
      case 'NO':
        return 'ល.រ';
      default:
        return 'ល.រ';
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { Params } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { log } from 'console';
import moment from 'moment';
import { BaseDatatable } from 'src/app/models/datatables/base.datatable';
import { useFilter } from 'src/app/models/filter';
import { TableColumn } from 'src/app/models/table-column';
import { ReportService } from 'src/app/services/report.service';
import { SchoolService } from 'src/app/services/school.service';
import { Pagination } from 'src/app/shares/pagination/pagination';
import * as XLSX from 'xlsx';

const EXCEL_EXTENSION = '.xlsx';

@Component({
  selector: 'app-attendance-report',
  templateUrl: './attendance-report.component.html',
  styleUrls: ['./attendance-report.component.scss']
})
export class AttendanceReportComponent implements OnInit {

  requestUrl: string;
  params = {
    year: null
  };
  tableColumns: TableColumn[] = [
    {
      name: 'table.name',
      dataKey: 'name',
      custom: true,
      isSortable: true
    },
    {
      name: 'table.gender',
      dataKey: 'gender',
      custom: true
    },
    {
      name: 'table.schools',
      dataKey: 'schools',
      custom: true
    },
    {
      name: 'present',
      dataKey: 'present',
      custom: true
    },
    {
      name: 'absent',
      dataKey: 'absent',
      custom: true
    },
    {
      name: 'leave',
      dataKey: 'permission',
      custom: true
    }
  ];
  tableData: BaseDatatable<any>;

  today = moment();
  useFilters: useFilter[] = ['schools', 'month'];
  filterParams: Params = {};

  exportButton = {
    label: 'button.export_file',
    matIcon: 'print',
    svgIcon: '',
    color: 'print'
  };
  list: any[];

  constructor(
    public translate: TranslateService,
    private reportService: ReportService,
    public schoolService: SchoolService
  ) {
    this.requestUrl = reportService.path + "/attendance_list?year=" + this.today.year();
  }

  ngOnInit(): void {
    this.params.year = this.today.year();
    this.getAttendanceList();
  }

  getAttendanceList(pagination?: Pagination) {
    const params = { ...this.params, ...pagination, ...this.filterParams };    
    this.reportService.getAttendanceList(params).subscribe({
      next: (res) => {
        this.tableData = res;
        
      }
    });
  }

  setParams(filterParams: Params): void {
    this.filterParams = { ...filterParams };
    this.getAttendanceList()
  }

  export() {
    const params = {
      ...this.params,
      limit: 0,
      page: 1,
      ...this.filterParams };

    this.reportService.getAttendanceList(params).subscribe(
      res => {
        this.list = res.list;
        
        let data = this.mapData();

        /* make the worksheet */
        var worksheet = XLSX.utils.json_to_sheet(data);

        /* add to workbook */
        var workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance");

        /* generate an XLSX file */
        const fileName = 'Attendance Report' + '_export_' + new Date().getTime() + EXCEL_EXTENSION;
        XLSX.writeFile(workbook, fileName);
      }
    );
  }

  mapData() {

    const row = this.list;
    let result = [];
    for (let index = 0; index < row.length; index++) {
      const element = row[index];
      const item = {
        No: index + 1,
        STUDENT: element.last_name + " " + element.first_name,
        GENDER: element.gender,
        SCHOOL: element.schools?.name,
        PRESENT: element.present,
        ABSENT: element.absent,
        LEAVE: element.permission
      };
      result.push(item);
    }

    return result;
  }

  goTo(pagination: Pagination) {
    this.getAttendanceList(pagination);
  }

}

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs/internal/Observable';
import { pAdmin } from 'src/app/helpers/permission';
import { BaseDatatable } from 'src/app/models/datatables/base.datatable';
import { StudentRequests } from 'src/app/models/student';
import { TableColumn } from 'src/app/models/table-column';
import { StudentService } from 'src/app/services/student.service';
import { Pagination } from 'src/app/shares/pagination/pagination';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-pending-list',
  templateUrl: './pending-list.component.html',
  styleUrls: ['./pending-list.component.scss']
})
export class PendingListComponent implements OnInit {
  pStudent = pAdmin.student;
  params = {
    limit: 10,
    page: 1,
    search: ''
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
      name: 'table.phone',
      dataKey: 'phone',
      custom: true
    },
    {
      name: 'table.poor_id',
      dataKey: 'poor_id',
      custom: true
    },
    {
      name: 'table.schools',
      dataKey: 'schools',
      custom: true
    },
    {
      name: 'table.major',
      dataKey: 'major',
      custom: true
    },
    {
      name: 'table.status',
      dataKey: 'status',
      custom: true
    },
    {
      name: 'table.action',
      dataKey: 'action',
      custom: true
    }
  ];
  tableData: BaseDatatable<StudentRequests>;

  requestUrl: string;
  isPoorId: boolean = false;

  filterData$!: Observable<unknown>;

  filterParams: Params = {};

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public translate: TranslateService,
    private studentService: StudentService
  ) {
    this.requestUrl = studentService.path + '/requesting_list';
    this.filterData$ = studentService.filterDataStudentRequest();
  }

  ngOnInit(): void {
    this.getRequesting();
  }

  getRequesting(pagination?: Pagination) {
    const params = { ...this.params, ...pagination, ...this.filterParams };
    this.studentService.getRequesting(params).subscribe({
      next: res => {
        this.tableData = res;
      }
    });
  }

  goToCreatePage(label: string): void {
    if (label === 'poorId') this.onCreateWithPoorId();
    else this.onCreate();
  }

  onCreate() {
    this.router.navigate(['create'], { relativeTo: this.route });
  }

  onCreateWithPoorId() {
    this.router.navigate(['create-with-poor-id'], { relativeTo: this.route });
  }

  onExportFile(): void {
    //clone table from parent element
    const table = document.getElementById('request-scholarship-table')?.cloneNode(true) as HTMLElement;

    //remove action columns
    this.onCheckTable(table);

    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(table);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, 'file.xlsx');
  }

  onCheckTable(element: HTMLElement): void {
    const table = element;

    //remove th element -> class = mat-column-table-action from table element
    //TODO: custom view when export to excel
    let thRemove = table
      .getElementsByTagName('thead')[0]
      ?.getElementsByTagName('tr')[0]
      ?.getElementsByClassName('mat-column-table-action');
    for (let i = thRemove?.length - 1; i >= 0; i--) {
      thRemove[i]?.remove();
    }

    //remove td element -> class = mat-column-table-action from table element
    //TODO: custom view when export to excel
    let tds = table.getElementsByTagName('tbody')[0]?.children;
    for (let index = 0; index < tds?.length; index++) {
      let tdRemove = tds[index]?.getElementsByClassName('mat-column-table-action');
      for (let i = tdRemove?.length - 1; i >= 0; i--) {
        tdRemove[i]?.remove();
      }
    }
  }

  //TODO: searching functions
  timer: ReturnType<typeof setTimeout>;
  onSearch(value: string) {
    this.params.search = value;
    this.startSearch();
  }
  startSearch() {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.getRequesting(), 500);
  }

  goTo(pagination: Pagination) {
    this.getRequesting(pagination);
  }

  //Filtering Data Functions
  setParams(filterParams: Params): void {
    if (Object.keys(filterParams).length < 1) this.filterParams = [];
    else this.filterParams = filterParams;
    this.startSearch();
  }
}

import { Component, OnInit } from '@angular/core';
import { Params } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs/internal/Observable';
import { BaseDatatable } from 'src/app/models/datatables/base.datatable';
import EnumConstant from 'src/app/models/enums/enumConstant';
import { StudentRequests } from 'src/app/models/student';
import { TableColumn } from 'src/app/models/table-column';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { StudentService } from 'src/app/services/student.service';
import { Pagination } from 'src/app/shares/pagination/pagination';

@Component({
  selector: 'app-rejected-list',
  templateUrl: './rejected-list.component.html',
  styleUrls: ['./rejected-list.component.scss']
})
export class RejectedListComponent implements OnInit {
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
      name: 'table.action',
      dataKey: 'action',
      custom: true
    }
  ];
  tableData: BaseDatatable<StudentRequests>;

  requestUrl: string;

  filterData$!: Observable<unknown>;

  filterParams: Params = {};

  constructor(
    public translate: TranslateService,
    private studentService: StudentService,
    private snackbarService: SnackbarService
  ) {
    this.requestUrl = studentService.path + '/rejected';
    this.filterData$ = studentService.filterData({ status: EnumConstant.REJECT });
  }

  ngOnInit(): void {
    this.getRejected();
  }

  getRejected(pagination?: Pagination) {
    const params = { ...this.params, ...pagination, ...this.filterParams };
    this.studentService.getRejected(params).subscribe({
      next: res => {
        this.tableData = res;
      }
    });
  }

  //TODO: searching functions
  timer: ReturnType<typeof setTimeout>;
  onSearch(value: string) {
    this.params.search = value;
    this.startSearch();
  }
  startSearch() {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.getRejected(), 500);
  }

  goTo(pagination: Pagination) {
    this.getRejected(pagination);
  }

  //Filtering Data Functions
  setParams(filterParams: Params): void {
    if (Object.keys(filterParams).length < 1) this.filterParams = [];
    else this.filterParams = filterParams;
    this.startSearch();
  }
}

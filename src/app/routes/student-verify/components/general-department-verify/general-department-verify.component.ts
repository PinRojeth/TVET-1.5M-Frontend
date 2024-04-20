import { Component } from '@angular/core';
import { Params } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { pAdmin } from 'src/app/helpers/permission';
import { BaseDatatable } from 'src/app/models/datatables/base.datatable';
import { StudentRequests } from 'src/app/models/student';
import { TableColumn } from 'src/app/models/table-column';
import { GeneralDepartmentVerifyService } from 'src/app/services/general-department-verify.service';
import { Pagination } from 'src/app/shares/pagination/pagination';

@Component({
  selector: 'app-general-department-verify',
  templateUrl: './general-department-verify.component.html',
  styleUrls: ['./general-department-verify.component.scss']
})
export class GeneralDepartmentVerifyComponent {
  pStudent = pAdmin.approvalInfoStudent;
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

  filterData$!: Observable<unknown>;

  filterParams: Params = {};

  constructor(public translate: TranslateService, private studentVerifyService: GeneralDepartmentVerifyService) {
    this.requestUrl = studentVerifyService.path;
    this.filterData$ = studentVerifyService.filterData();
  }

  ngOnInit(): void {
    this.onLoad();
  }

  onLoad(pagination?: Pagination) {
    const params = { ...this.params, ...pagination, ...this.filterParams };
    this.studentVerifyService.getMany(params).subscribe({
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
    this.timer = setTimeout(() => this.onLoad(), 500);
  }

  goTo(pagination: Pagination) {
    this.onLoad(pagination);
  }

  //Filtering Data Functions
  setParams(filterParams: Params): void {
    if (Object.keys(filterParams).length < 1) this.filterParams = [];
    else this.filterParams = filterParams;
    this.startSearch();
  }
}

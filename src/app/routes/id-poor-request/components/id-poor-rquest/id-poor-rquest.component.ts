import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { pAdmin } from 'src/app/helpers/permission';
import { BaseDatatable } from 'src/app/models/datatables/base.datatable';
import EnumConstant from 'src/app/models/enums/enumConstant';
import { StudentRequests } from 'src/app/models/student';
import { TableColumn } from 'src/app/models/table-column';
import { PoorStudentService } from 'src/app/services/poor-student.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { Pagination } from 'src/app/shares/pagination/pagination';

@Component({
  selector: 'app-id-poor-rquest',
  templateUrl: './id-poor-rquest.component.html',
  styleUrls: ['./id-poor-rquest.component.scss']
})
export class IdPoorRquestComponent {
  pStudent = pAdmin.poorStudent;
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

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public translate: TranslateService,
    private poorStudentService: PoorStudentService,
    private snackbarService: SnackbarService
  ) {
    this.requestUrl = poorStudentService.path;
    this.filterData$ = poorStudentService.filterData();
  }

  ngOnInit(): void {
    this.onLoad();
  }

  onLoad(pagination?: Pagination) {
    const params = { ...this.params, ...pagination, ...this.filterParams };
    this.poorStudentService.getMany(params).subscribe({
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

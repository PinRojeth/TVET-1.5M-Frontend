import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { pAdmin } from 'src/app/helpers/permission';
import { BaseDatatable } from 'src/app/models/datatables/base.datatable';
import { School } from 'src/app/models/school';
import { TableColumn } from 'src/app/models/table-column';
import { SchoolService } from 'src/app/services/school.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { Pagination } from 'src/app/shares/pagination/pagination';

@Component({
  selector: 'app-school-list',
  templateUrl: './school-list.component.html',
  styleUrls: ['./school-list.component.scss']
})
export class SchoolListComponent implements OnInit {
  pSchool = pAdmin.school;
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
      name: 'table.location',
      dataKey: 'location',
      custom: true
    },
    {
      name: 'table.code',
      dataKey: 'code',
      custom: true
    },
    {
      name: 'table.major-count',
      dataKey: 'major-count',
      custom: true
    },
    {
      name: 'table.action',
      dataKey: 'action',
      custom: true
    }
  ];
  tableData: BaseDatatable<School>;

  filterData$!: Observable<unknown>;

  filterParams: Params = {};

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public schoolService: SchoolService,
    private snackbarService: SnackbarService
  ) {
    this.filterData$ = schoolService.filterData();
  }

  ngOnInit(): void {
    this.getSchools();
  }

  getSchools(pagination?: Pagination) {
    const params = { ...this.params, ...pagination, ...this.filterParams };
    this.schoolService.getMany(params).subscribe({
      next: res => {
        this.tableData = res;
      },
      error: err => {
        this.snackbarService.onShowSnackbar({
          message:
            err.error?.errors instanceof Array
              ? err.error?.errors[0].msg
              : err.error?.message ?? 'Something went wrong',
          isError: true
        });
      }
    });
  }

  onCreate() {
    this.router.navigate(['create'], { relativeTo: this.route });
  }

  //TODO: searching functions
  timer: ReturnType<typeof setTimeout>;
  onSearch(value: string) {
    this.params.search = value;
    this.startSearch();
  }
  startSearch() {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.getSchools(), 500);
  }

  goTo(pagination: Pagination) {
    this.getSchools(pagination);
  }

  //Filtering Data Functions
  setParams(filterParams: Params): void {
    if (Object.keys(filterParams).length < 1) this.filterParams = [];
    else this.filterParams = filterParams;
    this.startSearch();
  }
}

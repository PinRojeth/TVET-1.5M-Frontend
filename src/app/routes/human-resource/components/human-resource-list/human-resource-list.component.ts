import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { pAdmin } from 'src/app/helpers/permission';
import { BaseDatatable } from 'src/app/models/datatables/base.datatable';
import { Staff } from 'src/app/models/staff';
import { TableColumn } from 'src/app/models/table-column';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { StaffService } from 'src/app/services/staff.service';
import { Pagination } from 'src/app/shares/pagination/pagination';

@Component({
  selector: 'app-human-resource-list',
  templateUrl: './human-resource-list.component.html',
  styleUrls: ['./human-resource-list.component.scss']
})
export class HumanResourceListComponent implements OnInit {
  pStaff = pAdmin.staff;
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
      name: 'table.role',
      dataKey: 'role',
      custom: true
    },
    {
      name: 'table.school',
      dataKey: 'schools',
      custom: true
    },
    {
      name: 'table.department',
      dataKey: 'department',
      custom: true
    },
    {
      name: 'table.action',
      dataKey: 'action',
      custom: true
    }
  ];
  tableData: BaseDatatable<Staff>;

  filterData$!: Observable<unknown>;

  filterParams: Params = {};

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public staffService: StaffService,
    public translate: TranslateService,
    private snackbarService: SnackbarService
  ) {
    this.filterData$ = staffService.filterData();
  }

  ngOnInit(): void {
    this.getStaffs();
  }

  getStaffs(pagination?: Pagination) {
    const params = { ...this.params, ...pagination, ...this.filterParams };
    this.staffService.getMany(params).subscribe({
      next: res => {
        this.tableData = res;
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
    this.timer = setTimeout(() => this.getStaffs(), 500);
  }

  goTo(pagination: Pagination) {
    this.getStaffs(pagination);
  }

  //Filtering Data Functions
  setParams(filterParams: Params): void {
    if (Object.keys(filterParams).length < 1) this.filterParams = [];
    else this.filterParams = filterParams;
    this.startSearch();
  }
}

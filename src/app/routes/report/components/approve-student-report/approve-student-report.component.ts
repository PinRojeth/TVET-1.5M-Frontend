import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Params } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs/internal/Observable';
import { BaseDatatable } from 'src/app/models/datatables/base.datatable';
import { useFilter } from 'src/app/models/filter';
import { TableColumn } from 'src/app/models/table-column';
import { LoadingService } from 'src/app/services/loading.service';
import { ReportService } from 'src/app/services/report.service';
import { SchoolService } from 'src/app/services/school.service';
import { Pagination } from 'src/app/shares/pagination/pagination';

@Component({
  selector: 'app-approve-student-report',
  templateUrl: './approve-student-report.component.html',
  styleUrls: ['./approve-student-report.component.scss']
})
export class ApproveStudentReportComponent implements OnInit {
  requestUrl: string;
  params = {
    limit: 10,
    page: 1,
    start_date: null,
    end_date: null
  };
  tableColumns: TableColumn[] = [
    {
      name: 'table.name',
      dataKey: 'name',
      custom: true,
      isSortable: true
    },
    {
      name: 'table.name_en',
      dataKey: 'name_en',
      custom: true,
      isSortable: true
    },
    {
      name: 'table.gender',
      dataKey: 'gender',
      custom: true
    },
    {
      name: 'table.date_birth',
      dataKey: 'dob',
      custom: true
    },
    {
      name: 'table.phone',
      dataKey: 'phone',
      custom: true
    },
    {
      name: 'form.id_card_number',
      dataKey: 'id_card_number',
      custom: true
    },
    {
      name: 'form.place_birth.title',
      dataKey: 'place_of_birth',
      custom: true
    },
    {
      name: 'form.address.title',
      dataKey: 'address',
      custom: true
    },
    {
      name: 'table.poor_id',
      dataKey: 'poor_id',
      custom: true
    },
    {
      name: 'table.type_poverty_status',
      dataKey: 'type_poverty_status',
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
      name: 'table.shift',
      dataKey: 'shifts',
      custom: true
    },
    {
      name: 'វត្តមាន',
      dataKey: 'average_attendance',
      custom: true
    },
    {
      name: 'table.status',
      dataKey: 'status',
      custom: true
    }
  ];
  tableData: BaseDatatable<any>;

  useFilters: useFilter[] = ['schools'];

  date: Date = new Date();
  firstDate = new Date(this.date.getFullYear(), this.date.getMonth(), 1);
  lastDate = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0);

  filterData$: Observable<unknown>;

  filterParams: Params = {};

  constructor(
    public translate: TranslateService,
    private reportService: ReportService,
    public schoolService: SchoolService,
    private loadingService: LoadingService
  ) {
    this.filterData$ = this.reportService.approvedStudentFilterData();
  }

  ngOnInit(): void {
    this.params.start_date = formatDate(this.firstDate, 'yyyy-MM-dd', 'en-Us');
    this.params.end_date = formatDate(this.lastDate, 'yyyy-MM-dd', 'en-Us');
    this.getApprovedList();
  }

  getApprovedList(pagination?: Pagination) {
    this.loadingService.setLoading('page', true);
    const params = { ...this.params, ...pagination, ...this.filterParams };
    this.reportService.getApprovedList(params).subscribe({
      next: res => {
        this.tableData = res;
        this.loadingService.setLoading('page', false);
      },
      error: () => this.loadingService.setLoading('page', false)
    });
  }

  setParams(filterParams: Params): void {
    if (Object.keys(filterParams).length < 1) this.filterParams = [];
    else this.filterParams = filterParams;
    this.startSearch();
  }

  timer: ReturnType<typeof setTimeout>;
  startSearch(): void {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.getApprovedList(), 500);
  }

  dateRangeEvent(event) {
    this.params = event;
    this.getApprovedList();
  }

  goTo(pagination: Pagination) {
    this.getApprovedList(pagination);
  }
}

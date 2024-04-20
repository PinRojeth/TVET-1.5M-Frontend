import { Component, inject } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { pAdmin } from 'src/app/helpers/permission';
import { DESTROYER$ } from 'src/app/helpers/unsubscribe';
import { Attendance } from 'src/app/models/attendance';
import { BaseDatatable } from 'src/app/models/datatables/base.datatable';
import { TableColumn } from 'src/app/models/table-column';
import { AttendanceService } from 'src/app/services/attendance.service';
import { Pagination } from 'src/app/shares/pagination/pagination';

@Component({
  selector: 'app-attendance-record',
  templateUrl: './attendance-record.component.html',
  styleUrls: ['./attendance-record.component.scss']
})
export class AttendanceRecordComponent {
  private readonly destroyer$ = DESTROYER$();

  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly attendanceService = inject(AttendanceService);

  pAttendance = pAdmin.attendance;

  tableColumns: TableColumn[] = [
    {
      name: 'វគ្គសិក្សា',
      dataKey: 'courses.name',
      custom: true,
      isSortable: true
    },
    {
      name: 'កាលបរិច្ឆេទ',
      dataKey: 'date',
      custom: true
    },
    {
      name: 'ចំនួនបេក្ខជន',
      dataKey: 'amount_student',
      custom: true
    },
    {
      name: 'គ្រឹះស្ថាន អ.ប.វ.',
      dataKey: 'school',
      custom: true
    },
    {
      name: 'table.action',
      dataKey: 'action',
      custom: true
    }
  ];
  tableData: BaseDatatable<Attendance>;

  filterData$: Observable<unknown> = this.attendanceService.filterData();

  filterParams: Params = {};
  params: Pagination = {
    limit: 10,
    page: 1,
    search: ''
  };

  requestUrl: string = this.attendanceService.path;

  ngOnInit(): void {
    this.onLoad();
  }

  onLoad(pagination?: Pagination) {
    const params = { ...this.params, ...pagination, ...this.filterParams };
    this.attendanceService
      .getMany(params)
      .pipe(takeUntil(this.destroyer$))
      .subscribe({
        next: res => {
          this.tableData = res;
        }
      });
  }

  onCreate(): void {
    this.router.navigate(['implement'], { relativeTo: this.route });
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

import { Component, inject } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { pAdmin } from 'src/app/helpers/permission';
import { DESTROYER$ } from 'src/app/helpers/unsubscribe';
import { AttendanceStudentRecord } from 'src/app/models/attendance';
import { BaseDatatable } from 'src/app/models/datatables/base.datatable';
import { TableColumn } from 'src/app/models/table-column';
import { StudentAttendanceService } from 'src/app/services/student-attendance.service';
import { Pagination } from 'src/app/shares/pagination/pagination';

@Component({
  selector: 'app-student-attendance',
  templateUrl: './student-attendance.component.html',
  styleUrls: ['./student-attendance.component.scss']
})
export class StudentAttendanceComponent {
  pStudent = pAdmin.attendanceRecord;

  private readonly destroyer$ = DESTROYER$();

  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly studentAttendanceService = inject(StudentAttendanceService);

  tableColumns: TableColumn[] = [
    {
      name: 'table.name',
      dataKey: 'year',
      custom: true,
      isSortable: true
    },
    {
      name: 'table.school',
      dataKey: 'schools',
      custom: true
    },
    {
      name: 'ចំនួនសិស្ស',
      dataKey: 'amount_student',
      custom: true
    },
    {
      name: 'ចំនួនពិនិត្យ',
      dataKey: 'amount_check',
      custom: true
    },
    {
      name: 'ដាក់ស្នើនៅ',
      dataKey: 'submit_date',
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
  tableData: BaseDatatable<AttendanceStudentRecord>;

  filterData$!: Observable<unknown>;

  filterParams: Params = {};
  params: Pagination = {
    limit: 10,
    page: 1,
    search: ''
  };

  title: string = this.route.snapshot.data.title;
  requestUrl: string = this.studentAttendanceService.path;

  ngOnInit(): void {
    this.onLoad();
  }

  onLoad(pagination?: Pagination) {
    const params = { ...this.params, ...pagination, ...this.filterParams };
    this.studentAttendanceService
      .getMany({})
      .pipe(takeUntil(this.destroyer$))
      .subscribe({
        next: res => {
          this.tableData = res;
        }
      });
  }

  onCreate(): void {
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

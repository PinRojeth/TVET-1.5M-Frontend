import { Component, OnInit } from '@angular/core';
import { Params } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable, takeUntil } from 'rxjs';
import { DESTROYER$ } from 'src/app/helpers/unsubscribe';
import { BaseDatatable } from 'src/app/models/datatables/base.datatable';
import EnumConstant from 'src/app/models/enums/enumConstant';
import { Student } from 'src/app/models/student';
import { TableColumn } from 'src/app/models/table-column';
import { StudentService } from 'src/app/services/student.service';
import { Pagination } from 'src/app/shares/pagination/pagination';

@Component({
  selector: 'app-student-finish',
  templateUrl: './student-finish.component.html',
  styleUrls: ['./student-finish.component.scss']
})
export class StudentFinishComponent implements OnInit {
  private readonly destroyer$ = DESTROYER$();

  params: Pagination = {
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
  tableData: BaseDatatable<Student>;

  requestUrl: string;

  filterData$!: Observable<unknown>;

  filterParams: Params = {};

  constructor(public translate: TranslateService, private studentService: StudentService) {
    this.requestUrl = studentService.path + '/quit';
    this.filterData$ = studentService.filterData({status: EnumConstant.CANCEL});
  }

  ngOnInit(): void {
    this.onLoad();
  }

  onLoad(pagination?: Pagination): void {
    const params = { ...this.params, ...pagination, ...this.filterParams };
    this.studentService
      .getFinishStudent(params)
      .pipe(takeUntil(this.destroyer$))
      .subscribe({
        next: res => {
          this.tableData = res;
        }
      });
  }

  //TODO: searching functions
  timer: ReturnType<typeof setTimeout>;
  onSearch(value: string): void {
    this.params.search = value;
    this.startSearch();
  }

  startSearch(): void {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.onLoad(), 500);
  }

  goTo(pagination: Pagination): void {
    this.onLoad(pagination);
  }

   //Filtering Data Functions
   setParams(filterParams: Params): void {
    if (Object.keys(filterParams).length < 1) this.filterParams = [];
    else this.filterParams = filterParams;
    this.startSearch();
  }
}

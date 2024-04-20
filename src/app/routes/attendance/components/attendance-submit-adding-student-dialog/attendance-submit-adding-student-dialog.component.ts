import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Params } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { DESTROYER$ } from 'src/app/helpers/unsubscribe';
import { Student } from 'src/app/models/student';
import { AttendanceService } from 'src/app/services/attendance.service';
import { LoadingService } from 'src/app/services/loading.service';
import { Pagination } from 'src/app/shares/pagination/pagination';

@Component({
  selector: 'app-attendance-submit-adding-student-dialog',
  templateUrl: './attendance-submit-adding-student-dialog.component.html',
  styleUrls: ['./attendance-submit-adding-student-dialog.component.scss']
})
export class AttendanceSubmitAddingStudentDialogComponent {
  private readonly destroyer$ = DESTROYER$();

  private readonly dialogRef = inject(MatDialogRef<AttendanceSubmitAddingStudentDialogComponent>);
  private readonly attendanceService = inject(AttendanceService);
  readonly loadingService = inject(LoadingService);

  displayedColumns: string[] = ['position', 'name', 'gender', 'poor_id', 'courses', 'average_attendance', 'action'];
  dataSource: MatTableDataSource<Student>;

  filterData$: Observable<unknown> = null;

  filterParams: Params = {};
  params: Pagination = {
    limit: 10,
    page: 1,
    search: ''
  };

  requestUrl: string = this.attendanceService.path + '_submit/student';

  isLoaded: boolean;

  total: number;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { student: Student[]; start_date: string; end_date: string }) {
    this.onLoad();
    this.filterData$ = this.attendanceService.filterStudentDataSubmit({
      start_date: data.start_date,
      end_date: data.end_date
    });
  }

  onLoad(pagination?: Pagination) {
    const params = {
      ...this.params,
      ...pagination,
      ...this.filterParams,
      start_date: this.data.start_date,
      end_date: this.data.end_date
    };
    this.attendanceService
      .getStudentListSubmit(params)
      .pipe(
        map(map => {
          //get all selected student from parent table data.
          if (this.data?.student?.length > 0 && !this.isLoaded) {
            this.selectedStudentList = this.data?.student.filter(fil => !!fil?.is_check);
            this.isLoaded = true;
          }

          if (this.selectedStudentList?.length > 0) {
            for (const item of map.list) {
              if (this.selectedStudentList.map(map => map._id).includes(item._id)) {
                item.disabled = this.data?.student.find(value => value._id === item._id)?.disabled;
              }
            }
          }

          return map;
        }),
        takeUntil(this.destroyer$)
      )
      .subscribe({
        next: res => {
          this.dataSource = new MatTableDataSource(res.list);
          this.total = res?.total;

          this.onCheckDataReload();
        }
      });
  }

  /**
   * TODO: be able to check multiple page
   */
  selectedStudentList: Student[] = [];
  totalStudentSelected: number = 0;
  dataCheckedPerPage: Student[];
  isCheckColumn: boolean = false;
  private isCheckRow: boolean = false;

  onSelectStudentRow(event: any, data: Student) {
    if (event.checked) {
      this.selectedStudentList.push(data);
    } else {
      this.selectedStudentList = this.selectedStudentList.filter(filter => filter._id != data._id && !filter?.disabled);
      this.dataSource.data.filter(fil => fil._id === data._id && !fil?.disabled).map(map => (map['is_check'] = false));
      this.isCheckRow = true;
    }
    this.totalStudentSelected = this.selectedStudentList.length;
    this.onCheckDataReload();
  }

  onCheckDataReload() {
    //*make sure data is still check even data is reloaded
    if (this.selectedStudentList.length !== 0) {
      for (let data of this.dataSource.data) {
        for (let selected of this.selectedStudentList) {
          if (data._id === selected._id) data['is_check'] = true;
        }
      }
    }

    //*show checked icon if data of current page is checked all
    this.dataCheckedPerPage = this.dataSource.data.filter(fil => fil.is_check && !fil?.disabled);
    if (this.dataCheckedPerPage.length === this.dataSource.data.filter(fil => !fil?.disabled).length)
      this.isCheckColumn = true;
    else this.isCheckColumn = false;
  }

  onSelectStudentColumn() {
    if (this.dataSource.data) {
      this.isCheckColumn = !this.isCheckColumn;
      for (let student of this.dataSource.data.filter(fil => !fil?.disabled)) {
        if (this.isCheckColumn) {
          student['is_check'] = true;
          this.selectedStudentList.push(student);
          this.onGetUniqueStudent();
        } else {
          student['is_check'] = false;
          this.selectedStudentList = this.selectedStudentList.filter(fil => fil._id !== student._id);
        }
      }
      this.onCheckDataReload();
      this.totalStudentSelected = this.selectedStudentList.length;
    }
  }

  onGetUniqueStudent() {
    this.selectedStudentList = this.selectedStudentList.reduce((unique, o) => {
      if (!unique.some(obj => obj._id === o._id)) {
        unique.push(o);
      }
      return unique;
    }, []);
  }
  /**
   * !End of be able to check multiple page
   */

  onSubmit(): void {
    if (this.selectedStudentList.some(fil => !!fil?.is_check)) {
      const VALID_DATA: Student[] = this.selectedStudentList.filter(fil => !!fil?.is_check);
      this.dialogRef.close(VALID_DATA);
    }
  }

  goTo(pagination: Pagination): void {
    this.params = { ...this.params, ...pagination };
    this.onLoad(pagination);
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

  //Filtering Data Functions
  setParams(filterParams: Params): void {
    if (Object.keys(filterParams).length < 1) this.filterParams = [];
    else this.filterParams = filterParams;
    this.startSearch();
  }
}

import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Params } from '@angular/router';
import { Observable, takeUntil } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { DESTROYER$ } from 'src/app/helpers/unsubscribe';
import { ApplyCountBySchool } from 'src/app/models/report';
import { LoadingService } from 'src/app/services/loading.service';
import { ReportService } from 'src/app/services/report.service';
import { environment } from 'src/environments/environment';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-report-weekly-progress',
  templateUrl: './report-weekly-progress.component.html',
  styleUrls: ['./report-weekly-progress.component.scss']
})
export class ReportWeeklyProgressComponent {
  private readonly destroyer$ = DESTROYER$();

  readonly loadingService = inject(LoadingService);

  private readonly reportService = inject(ReportService);

  date: Date = new Date();
  endDate: Date = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0);

  form = inject(FormBuilder).group({
    end: [null, Validators.required]
  });

  requestUrl: string = environment.api_url + this.reportService.path + '/report_weekly_progress';
  baseColumn: string[] = ['position', 'province', 'institution', 'school'];
  baseTopColumn: string[] = ['#', 'វិស័យ', 'មុខជំនាញ', 'ឈ្មោះគ្រឹះស្ថានបណ្តុះបណ្តាល'];

  // baseColumn: string[] = [
  //   'position',
  //   'date',
  //   'major',
  //   'institution',
  //   'register',
  //   'incompleteCondition',
  //   'approve',
  //   'dropOut',
  //   'studying',
  //   'attendaceUnderEightPercent',
  //   'internship',
  //   'examForGraduate',
  //   'graduated',
  //   'haveWork'
  // ];
  exportColumn: string[] = this.baseColumn;
  tableDataSource = new MatTableDataSource<ApplyCountBySchool>(null);
  displayedColumns: string[] = this.baseColumn;
  // baseTopColumn: string[] = [
  //   'ល.រ',
  //   'កាលបរិច្ឆេទ',
  //   'ឈ្មោះជំនាញ',
  //   'ឈ្មោះគ្រឹះស្ថានបណ្តុះបណ្តាល',
  //   'ចំនួនការចុះឈ្មោះ (ដាក់ពាក្យ)',
  //   'មិនគ្រប់លក្ខខណ្ឌ/ចង់រៀន',
  //   'ចូលសិក្សា (ទទួលការអនុម័ត)',
  //   'បោះបង់ការសិក្សា',
  //   'កំពុងសិក្សា',
  //   'វត្តមានក្រោម៨០%',
  //   'កំពុងកម្មសិក្សា',
  //   'ប្រឡងបញ្ចប់ការសិក្សា',
  //   'បញ្ចប់ការសិក្សា (ប្រឡងជាប់)',
  //   'ទទួលបានការងារ'
  // ];
  topColumn: string[] = this.baseTopColumn;
  dynamicColumn: { _id: string; name: string }[];

  data: ApplyCountBySchool;
  filterData$: Observable<unknown> = this.reportService.filterDataRequest();

  filterParams: Params = {};

  onLoad(): void {
    this.loadingService.setLoading('page', true);
    let data = [];
    // let startDate: string = `${new Date(this.form.value.start).toLocaleDateString('en-ZA')} ${new Date(
    //   this.form.value.start
    // ).toLocaleTimeString('en-US', { hour12: false })}`;

    let endDate: string = `${new Date(this.form.value.end).toLocaleDateString('en-ZA')} ${new Date(
      this.form.value.end
    ).toLocaleTimeString('en-US', { hour12: false })}`;

    this.reportService
      .getWeeklyProgress({ ...this.filterParams, end_date: endDate }) //, start_date: startDate,
      .pipe(
        map(map => {
          if (map?.report_data?.length > 0) {
            for (const body of map.report_data) {
              data.push({ ...body, province: true, colSpan: this.baseTopColumn?.length - 1 });

              //mapping data table
              for (const [index, item] of body?.apply_majors?.entries()) {
                let dataHasSchool = data?.filter(fil => fil?.school);
                data.push({
                  ...item,
                  school: true,
                  index: dataHasSchool?.length > 0 ? dataHasSchool[dataHasSchool.length - 1]?.index + 1 : 1,
                  colSpan: -1
                });
              }
            }

            data.push({
              index: 'សរុបរួម',
              school: true,
              student_data: map?.total_data
            });
          }

          //columns management
          if (map?.header_columns?.length > 0) {
            //second header in table
            this.exportColumn = []; //assign to table
            this.dynamicColumn = []; //display

            this.topColumn = [...this.baseTopColumn, ...map?.header_columns.map(map => map.name)];

            //mapping second header
            for (let index = 0; index < map.header_columns?.length; index++) {
              for (let j = 0; j < 2; j++) {
                let result = map.header_columns[index];
                this.exportColumn.push('th' + index + j);
                this.dynamicColumn.push({
                  name: 'th' + index + j,
                  _id: result._id
                });
              }
            }
          }
          console.log(map);

          return map;
        }),
        takeUntil(this.destroyer$)
      )
      .subscribe({
        next: res => {
          this.data = res;
          this.tableDataSource = new MatTableDataSource(data);
          this.displayedColumns = [...this.baseColumn, ...this.exportColumn];
          this.loadingService.setLoading('page', false);

          setTimeout(() => {
            this.onCheckTable();
          }, 0);
        },
        error: () => this.loadingService.setLoading('page', false)
      });
  }

  onCheckTable(): void {
    const table = document.getElementById('table');

    //remove th element -> class = display-none from table element
    //TODO: custom view when export to excel
    let thRemove = table
      .getElementsByTagName('thead')[0]
      ?.getElementsByTagName('tr')[1]
      ?.getElementsByClassName('display-none');

    for (let i = thRemove?.length - 1; i >= 0; i--) {
      thRemove[i]?.remove();
    }

    //remove td element -> class = display-none from table element
    //TODO: custom view when export to excel
    let tds = table.getElementsByTagName('tbody')[0]?.children;
    for (let index = 0; index < tds?.length; index++) {
      let tdRemove = tds[index]?.getElementsByClassName('display-none');
      for (let i = tdRemove?.length - 1; i >= 0; i--) {
        tdRemove[i]?.remove();
      }
    }
  }

  dateRangeChange(): void {
    if (this.form.valid) {
      this.onLoad();
    } else return;
  }

  onDateChange(): void {
    this.form.markAllAsTouched();
    this.dateRangeChange();
  }

  onInputDate(): void {
    let data = this.form.value;
    if (!data.end) {
      this.form.controls.end.markAllAsTouched();
      this.form.controls.end.setErrors({ 'minDate': true });
    } else if (!!this.form.controls.end.value && this.form.controls.end.invalid) this.form.controls.end.setErrors(null);
  }

  setParams(filterParams: Params): void {}

  onExportFile(): void {
    const table = document.getElementById('table')?.cloneNode(true) as HTMLElement;
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(table);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, 'file.xlsx');
  }

  trackByFn(index: number, item: any): void {
    return item?._id ?? index ?? item?.name ?? item;
  }
}

import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Params } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { DESTROYER$ } from 'src/app/helpers/unsubscribe';
import { ApplyCountBySchool } from 'src/app/models/report';
import { LoadingService } from 'src/app/services/loading.service';
import { ReportService } from 'src/app/services/report.service';
import { environment } from 'src/environments/environment';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-report-enrollment-by-all',
  templateUrl: './report-enrollment-by-all.component.html',
  styleUrls: ['./report-enrollment-by-all.component.scss']
})
export class ReportEnrollmentByAllComponent {
  private readonly destroyer$ = DESTROYER$();

  readonly loadingService = inject(LoadingService);
  private readonly reportService = inject(ReportService);

  date: Date = new Date();
  startDate: Date = new Date(this.date.getFullYear(), this.date.getMonth(), 1);
  endDate: Date = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0);

  form = inject(FormBuilder).group({
    start: [null, Validators.required],
    end: [null, Validators.required]
  });

  requestUrl: string = environment.api_url + this.reportService.path + '/student_apply_count';

  baseColumn: string[] = ['position', 'province', 'institution', 'sectors', 'apply_majors'];
  exportColumn: string[] = this.baseColumn;
  tableDataSource = new MatTableDataSource<ApplyCountBySchool>(null);
  displayedColumns: string[] = this.baseColumn;
  baseTopColumn: string[] = ['#', 'រាជធានី/ខេត្ត', 'គ្រឹះស្ថាន អ.ប.វ.', 'វិស័យ', 'មុខជំនាញ'];
  topColumn: string[] = this.baseTopColumn;
  dynamicColumn: { _id: string; name: string }[];

  data: ApplyCountBySchool;

  filterData$: Observable<unknown> = this.reportService.filterData();

  filterParams: Params = {};

  ngOnInit(): void {}

  onLoad(): void {
    this.loadingService.setLoading('page', true);
    let data = [];
    let startDate: string = `${new Date(this.form.value.start).toLocaleDateString('en-ZA')} ${new Date(
      this.form.value.start
    ).toLocaleTimeString('en-US', { hour12: false })}`;

    let endDate: string = `${new Date(this.form.value.end).toLocaleDateString('en-ZA')} ${new Date(
      this.form.value.end
    ).toLocaleTimeString('en-US', { hour12: false })}`;

    this.reportService
      .getApplyStudentCityProvince({ ...this.filterParams, start_date: startDate, end_date: endDate })
      .pipe(
        map(map => {
          if (map?.report_data?.length > 0) {
            //*mapping data table
            for (const body of map.report_data) {
              data.push({ ...body, province: true, colSpan: this.baseTopColumn?.length - 1 });
              console.log(body.apply_majors);

              //school mapping
              if (body?.schools?.length > 0) {
                for (const [index, item] of body?.schools.entries()) {
                  let dataHasSchool = data?.filter(fil => fil?.school);
                  data.push({
                    ...item,
                    school: true,
                    index: dataHasSchool?.length > 0 ? dataHasSchool[dataHasSchool.length - 1]?.index + 1 : 1,
                    colSpan: this.baseTopColumn?.length - 2
                  });
                  console.log(item);

                  if (item?.sectors?.length > 0) {
                    //sector mapping
                    for (const sector of item?.sectors) {
                      data.push({
                        ...sector,
                        sector: true,
                        colSpan: this.baseTopColumn?.length - 3
                      });

                      if (sector?.apply_majors?.length > 0) {
                        console.log(sector.apply_majors);

                        //apply_majors mapping
                        for (const [j, apply_major] of sector?.apply_majors?.entries()) {
                          data.push({
                            ...apply_major,
                            apply_major: true,
                            colSpan: -1,
                            rowSpan: sector?.apply_majors?.length,
                            index: j + 1 //to rowSpan row of useless sector fields
                          });
                        }
                      }
                    }
                  }
                }
              }
            }

            //total data at the bottom of the table
            data.push({
              index: 'សរុបរួម',
              school: true,
              student_data: map?.total_data
            });
          }

          //*columns management
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
    if (!!data.start && !!data.end && new Date(data.start).getTime() > new Date(data.end).getTime()) {
      this.form.controls.end.markAsTouched();
      this.form.controls.end.setErrors({ 'minDate': true });
    } else if (!!this.form.controls.end.value && this.form.controls.end.invalid) this.form.controls.end.setErrors(null);
  }

  //Filtering Data Functions
  setParams(filterParams: Params): void {
    if (Object.keys(filterParams).length < 1) this.filterParams = [];
    else this.filterParams = filterParams;
  }

  trackByFn(index: number, item: any): void {
    return item?._id ?? index ?? item?.name ?? item;
  }

  onExportFile(): void {
    const table = document.getElementById('table')?.cloneNode(true) as HTMLElement;

    //add title in excel file
    let element = document.createElement('tr');
    table.getElementsByTagName('thead')[0].prepend(element);

    let startDate: string = `${new Date(this.form.value.start).toLocaleDateString('en-ZA')}, ${new Date(
      this.form.value.start
    ).toLocaleTimeString('en-US', { hour12: false })}`;
    let endDate: string = `${new Date(this.form.value.end).toLocaleDateString('en-ZA')}, ${new Date(
      this.form.value.end
    ).toLocaleTimeString('en-US', { hour12: false })}`;
    const title = `ចំនួនចុះឈ្មោះតាមរាជធានី-ខេត្ត, គ្រឹះស្ថាន អ.ប.វ., វិស័យ និងមុខជំនាញ ចាប់ពី ${startDate} ដល់ ${endDate}`;

    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(table);

    //add title text to excel file
    XLSX.utils.sheet_add_aoa(ws, [[title]], { origin: { r: 0, c: 0 } });

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, 'file.xlsx');
  }
}

import { formatDate } from '@angular/common';
import { Directive, HostListener, Input } from '@angular/core';
import { Params } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { takeUntil } from 'rxjs/operators';
import { Unsubscribe } from 'src/app/helpers/unsubscribe';
import { StudentRequests } from 'src/app/models/student';
import { LoadingService } from 'src/app/services/loading.service';
import { ReportService } from 'src/app/services/report.service';
import { FullNamePipe } from 'src/app/shares/name/pipes/full-name.pipe';
import { TranslateApiPipe } from 'src/app/shares/translate-api/translate-api.pipe';
import * as XLSX from 'xlsx';

const EXCEL_EXTENSION = '.xlsx';

@Directive({
  selector: '[appExportAsExcelApproveStudents]',
  providers: [FullNamePipe, TranslateApiPipe]
})
export class ExportAsExcelApproveStudentsDirective extends Unsubscribe {
  @Input('appExportAsExcelApproveStudents') data: { params: Params; filterParams: Params };

  constructor(
    private loadingService: LoadingService,
    private reportService: ReportService,
    private fullNamePipe: FullNamePipe,
    private translateService: TranslateService,
    private translateAPIPipe: TranslateApiPipe
  ) {
    super();
  }

  @HostListener('click') onClick() {
    this.getApprovedList();
  }

  getApprovedList() {
    this.loadingService.setLoading('page', true);
    this.reportService
      .getApprovedList({ ...this.data.params, limit: 0, ...this.data?.filterParams })
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(res => {
        this.loadingService.setLoading('page', false);
        return this.xlsx(res.list);
      });
  }

  xlsx(list: StudentRequests[]) {
    let data = this.mapData(list);

    /* make the worksheet */
    var worksheet = XLSX.utils.json_to_sheet(data);

    /* add to workbook */
    var workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Approve Students');

    /* generate an XLSX file */
    const fileName = 'Approve Students Report' + '_export_' + new Date().getTime() + EXCEL_EXTENSION;
    XLSX.writeFile(workbook, fileName);
  }

  mapData(list: StudentRequests[]) {
    let result = [];
    for (let index = 0; index < list.length; index++) {
      const element = list[index];
      const item = {
        '#': index + 1,
        [this.translateService.instant('table.name')]: this.fullNamePipe.transform(element, 'km'),
        [this.translateService.instant('table.name_en')]: this.fullNamePipe.transform(element, 'en'),
        [this.translateService.instant('table.gender')]: this.translateService.instant(
          'form.gender.' + element?.gender
        ),
        [this.translateService.instant('table.date_birth')]: formatDate(
          new Date(element?.date_of_birth),
          'dd-MM-yyyy',
          'en-US'
        ),
        [this.translateService.instant('table.phone')]: element?.phone_number,
        [this.translateService.instant('form.place_birth.title')]: element?.place_of_birth?.name,
        [this.translateService.instant('form.address.title')]: element?.address.name,
        [this.translateService.instant('table.schools')]: this.translateAPIPipe.transform(
          element?.schools,
          this.translateService.currentLang
        ),
        [this.translateService.instant('table.major')]: this.translateAPIPipe.transform(
          element?.apply_majors,
          this.translateService.currentLang
        ),
        [this.translateService.instant('table.shift')]: this.translateAPIPipe.transform(
          element?.shifts,
          this.translateService.currentLang
        ),
        [this.translateService.instant('table.poor_id')]: element?.poor_id,
        [this.translateService.instant('table.type_poverty_status')]: element?.type_poverty_status,
        [this.translateService.instant('form.id_card_number')]: element?.id_card_number,
        [this.translateService.instant('attendance.name')]: element?.average_attendance
      };
      result.push(item);
    }

    return result;
  }
}

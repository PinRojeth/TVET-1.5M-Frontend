import { Unsubscribe } from 'src/app/helpers/unsubscribe';
import { BaseDatatable } from 'src/app/models/datatables/base.datatable';
import { SnackbarService } from 'src/app/services/snackbar.service';
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-searchbar-in-select-option',
  templateUrl: './searchbar-in-select-option.component.html',
  styleUrls: ['./searchbar-in-select-option.component.scss']
})
export class SearchbarInSelectOptionComponent extends Unsubscribe implements OnInit {
  @Output() createNew: EventEmitter<any> = new EventEmitter();
  @Output() queryEvent = new EventEmitter<string>();
  @Output() emitData = new EventEmitter<any[]>();
  @Output() emitSearchedValue = new EventEmitter<string>();
  @Output() emitApiData: EventEmitter<BaseDatatable<any>> = new EventEmitter();

  @Input() baseData: any[] = [];
  @Input() searchKey: string = 'name'; //?for nested object sample: 'name._id' or 'students.info.name'
  @Input() set clearInput(clear: number) {
    if (clear === 1) {
      this.searchForm.patchValue('');
      this.startAdvancedClear();
    }
  }
  @Input() serviceAPI: any | null = null;
  @Input() serviceName: string = 'getMany';

  searchForm: FormControl = new FormControl();
  timer: ReturnType<typeof setTimeout>;

  constructor(private translate: TranslateService, private snackbarService: SnackbarService) {
    super();
  }

  ngOnInit(): void {}

  onRenderData(): void {
    let lang: string = this.translate.currentLang;
    let key: string = lang === 'en' ? this.searchKey + '_en' : this.searchKey;

    //push value of input
    this.emitSearchedValue.emit(this.searchForm.value);

    //render searched data
    const renderData: any[] = JSON.parse(JSON.stringify(this.baseData));
    if (this.searchForm.value) {
      const newData: any[] = renderData.filter((item: object) =>
        this.injectKey(item, key)?.toString()?.toLowerCase()?.includes(this.searchForm.value.toLowerCase())
      );
      this.emitData.emit(newData);
    } else {
      this.startAdvancedClear();
    }
  }

  //seeking data by wanted key (searchKey)
  injectKey(obj: object, path: string): object {
    let array: string[] = path.split('.');
    let res: object = obj;
    for (let i = 0; i < array.length; i++) {
      res = res[array[i]];
    }
    return res;
  }

  search(): void {
    if (this.baseData?.length > 0) {
      this.startSearch();
    } else if (this.serviceAPI) this.onSearchAPI();
    else this.queryEvent.emit(this.searchForm.value);
  }

  startSearch(): void {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.onRenderData(), 500);
  }

  clear(): void {
    if (this.baseData?.length > 0) {
      this.startAdvancedClear();
    } else if (this.serviceAPI) this.onSearchAPI(true);
    else this.queryEvent.emit('');
    this.searchForm.patchValue('');
  }

  startAdvancedClear(): void {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.advancedClear(), 250);
    this.emitSearchedValue.emit(null);
  }

  advancedClear(): void {
    if (this.baseData?.length > 0) this.emitData.emit(JSON.parse(JSON.stringify(this.baseData)));
  }

  /**
   * @Create API Search Function
   */
  onSearchAPI(clear?: boolean): void {
    this.startSearchAPI(clear);
  }

  startSearchAPI(clear?: boolean): void {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.onGetData(clear), 500);
  }

  onGetData(clear?: boolean): void {
    this.serviceAPI[this.serviceName]({ limit: 0, page: 1, search: clear ? '' : this.searchForm.value })
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: res => {
          this.emitApiData.emit(res);
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
}

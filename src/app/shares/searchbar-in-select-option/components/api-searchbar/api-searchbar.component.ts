/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { takeUntil } from 'rxjs';
import { Unsubscribe } from 'src/app/helpers/unsubscribe';
import { Pagination } from 'src/app/shares/pagination/pagination';

@Component({
  selector: 'app-api-searchbar',
  templateUrl: './api-searchbar.component.html',
  styleUrls: ['./api-searchbar.component.scss']
})
export class ApiSearchbarComponent extends Unsubscribe implements OnChanges {
  @Output() emitApiData: EventEmitter<any[]> = new EventEmitter();
  @Output() emitSearchValue: EventEmitter<string> = new EventEmitter();

  @Input() serviceAPI: any | null = null;
  @Input() serviceName: string = 'getMany';

  @Input() addParam: Object = {};

  searchForm: FormControl = new FormControl();

  timer: ReturnType<typeof setTimeout>;

  params: Pagination = { limit: 0, page: 1, search: '' };
  newParam: Object;

  constructor() {
    super();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['serviceAPI'] && changes['serviceAPI']?.currentValue && Object?.keys(this.addParam)?.length < 1) {
      this.onGetData();
    } else if (changes['addParam'] && !this.checkAllObjectNull(changes['addParam']?.currentValue)) {
      this.newParam = changes['addParam']?.currentValue;
      this.onGetData();
    }
  }

  search(): void {
    this.onSearchAPI();
  }

  public clear(): void {
    if (this.searchForm.value) {
      this.searchForm.patchValue('');
      this.onSearchAPI();
    }
  }

  onSearchAPI(clear?: boolean): void {
    this.startSearchAPI(clear);
  }

  startSearchAPI(clear?: boolean): void {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.onGetData(clear);
      this.emitSearchValue.emit(this.searchForm.value);
    }, 500);
  }

  onGetData(clear?: boolean): void {
    this.params.search = clear ? '' : this.searchForm.value;
    let paramBind: Object = this.newParam ? { ...this.params, ...this.newParam } : this.params;

    this.serviceAPI[this.serviceName](paramBind)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: res => {
          this.emitApiData.emit(res.list);
        }
      });
  }

  checkAllObjectNull(data: Object): boolean {
    return data ? Object.values(data).some(o => !o) : true;
  }
}

/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-front-end-searchbar',
  templateUrl: './front-end-searchbar.component.html',
  styleUrls: ['./front-end-searchbar.component.scss']
})
export class FrontEndSearchbarComponent implements OnInit {
  @Output() createNew: EventEmitter<any> = new EventEmitter();
  @Output() queryEvent = new EventEmitter<string>();
  @Output() emitData = new EventEmitter<any[]>();
  @Output() emitSearchedValue = new EventEmitter<string>();

  @Input() baseData: any[] = [];
  @Input() searchKey: string = 'name'; //?for nested object sample: 'name._id' or 'students.info.name'
  @Input() set clearInput(clear: number) {
    if (clear === 1) {
      this.searchForm.patchValue('');
      this.startAdvancedClear();
    }
  }

  searchForm: FormControl = new FormControl();
  timer: ReturnType<typeof setTimeout>;

  constructor(private translate: TranslateService) {}

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
    this.startSearch();
  }

  startSearch(): void {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.onRenderData(), 500);
  }

  clear(): void {
    this.startAdvancedClear();
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
}

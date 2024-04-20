import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { Moment } from 'moment';

const MY_FORMATS = {
  parse: {
    dateInput: 'MM',
  },
  display: {
    dateInput: 'MM',
    monthYearLabel: 'MMM',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM',
  },
};

@Component({
  selector: 'app-month-date',
  templateUrl: './month-date.component.html',
  styleUrls: ['./month-date.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class MonthDateComponent implements OnChanges {

  monthDate = new FormControl();

  @Input() params: any;
  @Input() selectedYear: Moment;
  @Output() monthChange = new EventEmitter();

  chosenMonthHandler(normalized: Moment, dp?: any) {
    const ctrlValue = normalized;
    this.monthDate.setValue(ctrlValue);
    dp.close();
    this.monthChange.emit(ctrlValue.month() + 1);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.selectedYear?.currentValue) {
      const value: Moment = this.monthDate.value;

      if (value) {
        const date = new Date(this.selectedYear.year(), value.month(), 1);
        this.monthDate.setValue(date);
      } else {
        this.monthDate.setValue(this.selectedYear);
      }
    }

    if (changes?.params?.currentValue && Object.values(changes.params?.currentValue).length == 0) {
      this.monthDate.setValue('');
      this.monthChange.emit('');
    }
  }

}

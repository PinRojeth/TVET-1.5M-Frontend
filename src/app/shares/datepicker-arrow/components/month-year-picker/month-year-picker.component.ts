import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { MAT_DATE_LOCALE, MAT_DATE_FORMATS, DateAdapter } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import * as _moment from 'moment';
import { default as _rollupMoment, Moment } from 'moment';
const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'MMMM YYYY',
  },
  display: {
    dateInput: 'MMMM YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@Component({
  selector: 'app-month-year-picker',
  templateUrl: './month-year-picker.component.html',
  styleUrls: ['./month-year-picker.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ]
})
export class MonthYearPickerComponent implements OnInit {
  constructor() { }

  date = new FormControl(new Date());
  @Output() dateChange: EventEmitter<Date> = new EventEmitter<Date>();

  ngOnInit(): void {
  }

  onDateChange(normalizedMonth: Date, datepicker: MatDatepicker<Moment>) {
    this.date.setValue(new Date(normalizedMonth))
    this.dateChange.emit(new Date(normalizedMonth));
    datepicker.close();
  }

}

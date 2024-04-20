import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import moment, { Moment } from 'moment';

const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY',
  },
  display: {
    dateInput: 'YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

@Component({
  selector: 'app-year-date',
  templateUrl: './year-date.component.html',
  styleUrls: ['./year-date.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class YearDateComponent {

  yearDate = new FormControl(moment());

  @Output() yearChange = new EventEmitter();

  chosenYearHandler(normalized?: Moment, dp?: any) {
    const ctrlValue = normalized;
    this.yearDate.setValue(ctrlValue);
    dp.close();
    this.yearChange.emit(ctrlValue);
  }

}

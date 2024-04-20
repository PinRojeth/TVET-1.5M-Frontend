import { formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})
export class DatepickerComponent implements OnInit {
  constructor() {}

  //*Array Type

  //*Boolean Type

  //*String Type

  //*Number Type

  //*Date Type
  @Input() dateNow: Date = new Date();
  @Output() dateChange: EventEmitter<Date> = new EventEmitter<Date>();

  //*Object Type

  //*FormControl
  date: FormControl = new FormControl(this.dateNow);

  ngOnInit(): void {}

  onDateChange(value: Date): void {
    this.dateChange.emit(value);
  }

  onPrevDate() {
    this.date.setValue(new Date(new Date(this.date.value).setDate(new Date(this.date.value).getDate() - 1)));
    this.dateChange.emit(this.date.value);
  }

  onNextDate() {
    this.date.setValue(new Date(new Date(this.date.value).setDate(new Date(this.date.value).getDate() + 1)));
    this.dateChange.emit(this.date.value);
  }
}

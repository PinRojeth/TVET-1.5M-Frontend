import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateToTimeAgoPipe } from './pipes/date-to-time-ago.pipe';



@NgModule({
  declarations: [
    DateToTimeAgoPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DateToTimeAgoPipe
  ]
})
export class DateTimeModule { }

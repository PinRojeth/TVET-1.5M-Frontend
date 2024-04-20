import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KhmerWeekPipe } from './khmer-week.pipe';



@NgModule({
  declarations: [KhmerWeekPipe],
  imports: [
    CommonModule
  ],
  exports: [KhmerWeekPipe]
})
export class KhmerWeekModule { }

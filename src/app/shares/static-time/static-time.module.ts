import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimePipe } from './pipe/time.pipe';
import { HourPipe } from './pipe/hour.pipe';

@NgModule({
  declarations: [TimePipe, HourPipe],
  imports: [CommonModule],
  exports: [TimePipe, HourPipe]
})
export class StaticTimeModule { }

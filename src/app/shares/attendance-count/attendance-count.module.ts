import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AttendanceCountPipe } from './attendance-count.pipe';

@NgModule({
  declarations: [AttendanceCountPipe],
  imports: [CommonModule],
  exports: [AttendanceCountPipe]
})
export class AttendanceCountModule {}

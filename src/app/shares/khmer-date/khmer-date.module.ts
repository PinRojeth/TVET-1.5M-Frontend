import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { KhmerDatePipe } from './khmer-date.pipe';

@NgModule({
  declarations: [KhmerDatePipe],
  imports: [CommonModule],
  exports: [KhmerDatePipe]
})
export class KhmerDateModule {}

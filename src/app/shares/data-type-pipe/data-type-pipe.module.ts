import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypePipe } from './pipes/type.pipe';



@NgModule({
  declarations: [
    TypePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TypePipe
  ]
})
export class DataTypePipeModule { }

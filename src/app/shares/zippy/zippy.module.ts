import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZippyDirective } from './directive/zippy.directive';



@NgModule({
  declarations: [
    ZippyDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ZippyDirective
  ]
})
export class ZippyModule { }

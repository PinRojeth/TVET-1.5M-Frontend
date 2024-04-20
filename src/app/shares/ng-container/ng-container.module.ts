import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgLetDirective } from './directive/ng-let.directive';



@NgModule({
  declarations: [
    NgLetDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NgLetDirective
  ]
})
export class NgContainerModule { }

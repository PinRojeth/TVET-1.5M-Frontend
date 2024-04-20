import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropZoneDirective } from './directives/drop-zone.directive';



@NgModule({
  declarations: [DropZoneDirective],
  imports: [
    CommonModule
  ],
  exports: [DropZoneDirective]
})
export class DropZoneModule { }

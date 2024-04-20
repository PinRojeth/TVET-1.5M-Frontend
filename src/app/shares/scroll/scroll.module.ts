import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollToBottomDirective } from './directives/scroll-to-bottom.directive';



@NgModule({
  declarations: [
    ScrollToBottomDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [ScrollToBottomDirective]
})
export class ScrollModule { }

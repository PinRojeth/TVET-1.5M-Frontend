import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DateInputTranslateDirective } from './date-input-translate.directive';
import { TranslateApiPipe } from './translate-api.pipe';

@NgModule({
  declarations: [TranslateApiPipe, DateInputTranslateDirective],
  imports: [CommonModule],
  exports: [TranslateApiPipe, DateInputTranslateDirective]
})
export class TranslateApiModule {}

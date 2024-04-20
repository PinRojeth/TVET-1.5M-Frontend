import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DotLoadingComponent } from './components/dot-loading/dot-loading.component';

@NgModule({
  declarations: [DotLoadingComponent],
  imports: [CommonModule],
  exports: [DotLoadingComponent]
})
export class DotLoadingModule {}

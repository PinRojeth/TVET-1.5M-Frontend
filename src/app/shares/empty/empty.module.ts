import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmptyComponent } from './components/empty/empty.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    EmptyComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    MatIconModule
  ],
  exports: [
    EmptyComponent
  ]
})
export class EmptyModule { }

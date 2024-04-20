import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [SnackbarComponent],
  imports: [CommonModule, MatButtonModule, MatIconModule, MatProgressBarModule, TranslateModule],
  exports: [SnackbarComponent]
})
export class SnackbarModule {}

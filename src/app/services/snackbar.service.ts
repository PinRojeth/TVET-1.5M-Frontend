import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../shares/snackbar/components/snackbar/snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  status: number;
  constructor(private snackBar: MatSnackBar) {}

  onShowSnackbar(data: { message: string; isError?: boolean; component?: any }) {
    data.isError = data.isError ?? false;
    this.status = !data.isError ? 1 : 0;
    this.snackBar.openFromComponent(data.component ?? SnackbarComponent, {
      data: {
        message: data.message,
        status: this.status
      },
      panelClass: [data.isError ? 'snackbar-error' : 'snackbar-success', 'snackbar-custom'],
      // duration: 5000
    });
  }
}

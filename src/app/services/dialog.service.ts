import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../shares/confirm-dialog/components/confirm-dialog/confirm-dialog.component';

interface DialogData {
  title?: string;
  message?: string;
  icon?: string;
  button?: string;
  maxWidth?: string | number;
  minWidth?: string | number;
};
@Injectable({
  providedIn: 'root'
})
export class DialogService {
  constructor(private dialog: MatDialog) { }

  onShowDialog(data: DialogData): MatDialogRef<any> {
    if (data.title === '') data.title = null;
    if (data.message === '') data.message = null;
    const DIALOG_REF = this.dialog.open(ConfirmDialogComponent, {
      panelClass: 'confirm-dialog-custom',
      maxWidth: data.maxWidth ? data.maxWidth : null,
      minWidth: data.minWidth ? data.minWidth : null,
      data: {
        icon: data.icon ?? '/assets/imgs/delete.svg',
        title: data.title ?? 'dialog.delete_this_data',
        message: data.message ?? 'dialog.are_u_sure',
        button: data.button ?? 'confirm'
      }
    });
    return DIALOG_REF;
  }
}

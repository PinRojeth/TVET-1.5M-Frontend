import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { RejectDialogWithMsgComponent } from './components/reject-dialog-with-msg/reject-dialog-with-msg.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

@NgModule({
  declarations: [ConfirmDialogComponent, ChangePasswordComponent, ResetPasswordComponent, RejectDialogWithMsgComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    TranslateModule,
    MatDividerModule,
    MatSelectModule,
    MatOptionModule
  ]
})
export class ConfirmDialogModule { }

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { pAdmin } from 'src/app/helpers/permission';
import { Unsubscribe } from 'src/app/helpers/unsubscribe';
import { Staff } from 'src/app/models/staff';
import { StaffService } from 'src/app/services/staff.service';
import { ResetPasswordComponent } from 'src/app/shares/confirm-dialog/components/reset-password/reset-password.component';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { SnackbarComponent } from 'src/app/shares/snackbar/components/snackbar/snackbar.component';
import { ConfirmDialogComponent } from 'src/app/shares/confirm-dialog/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-human-resource-info',
  templateUrl: './human-resource-info.component.html',
  styleUrls: ['./human-resource-info.component.scss']
})
export class HumanResourceInfoComponent extends Unsubscribe implements OnInit {

  staffId: string;
  staff: Staff;
  pStaff = pAdmin.staff;

  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private staffService: StaffService,
    public translate: TranslateService,
    private snackbarService: SnackbarService
  ) {
    super();
    this.staffId = this.route.snapshot.paramMap.get('staffId');
  }

  ngOnInit(): void {
    this.getInfo();
  }

  getInfo() {
    this.staffService.getById(this.staffId).subscribe({
      next: (res) => {
        this.staff = res;
      },
    });
  }

  openResetPasswordDialog() {
    const dialogRef = this.dialog.open(ResetPasswordComponent, {
      width: '700px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const data = {
          'staffs': this.staffId,
          'new_password': result.new_password
        };

        this.staffService
          .resetPassword(data)
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe({
            next: () => {
              this.snackbarService.onShowSnackbar({ message: 'reset-password', component: SnackbarComponent });
            }
          });
      }
    });
  }

  onSetStatus(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        icon: 'assets/icons/confirm-ic.svg',
        title:
          this.translate.instant('dialog.title_acc') +
          (this.staff.status === 1
            ? this.translate.instant('dialog.disable')
            : this.translate.instant('dialog.enable')) +
          this.translate.instant('dialog.this_acc'),
        message:
          this.translate.instant('dialog.message') +
          (this.staff.status === 1
            ? this.translate.instant('dialog.inactive')
            : this.translate.instant('dialog.active')) +
          '.',
        button: 'confirm'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.staffService
          .setStatus({
            staffs: this.staff._id,
            status: this.staff.status === 1 ? -2 : 1
          })
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe(data => {
            this.snackbarService.onShowSnackbar({
              message: 'edit',
              component: SnackbarComponent
            });
            this.getInfo();
          });
      }
    });
  }

}

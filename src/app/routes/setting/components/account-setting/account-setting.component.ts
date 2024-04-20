import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { Observable, takeUntil } from 'rxjs';
import { pAdmin } from 'src/app/helpers/permission';
import { Unsubscribe } from 'src/app/helpers/unsubscribe';
import { RoleId } from 'src/app/models/enums/enumConstant';
import { Staff } from 'src/app/models/staff';
import { ProfileService } from 'src/app/services/profile.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { ChangePasswordComponent } from 'src/app/shares/confirm-dialog/components/change-password/change-password.component';
import { SnackbarComponent } from 'src/app/shares/snackbar/components/snackbar/snackbar.component';
import { StaticFilePipe } from 'src/app/shares/static-file/pipes/static-file.pipe';

@Component({
  selector: 'app-account-setting',
  templateUrl: './account-setting.component.html',
  styleUrls: ['./account-setting.component.scss']
})
export class AccountSettingComponent extends Unsubscribe implements OnInit {
  pStaff = pAdmin.staff;
  staff: Staff;
  profileImage: string;

  roleCheck: number = RoleId.DEPARTMENT;

  constructor(
    private staticFilePipe: StaticFilePipe,
    private dialog: MatDialog,
    private snackbarService: SnackbarService,
    private profileService: ProfileService,
    public translate: TranslateService
  ) {
    super();
  }

  ngOnInit(): void {
    this.onLoad();
  }

  onLoad(): void {
    const API: Observable<Staff> = this.profileService.getAccountInfo();
    API.pipe(takeUntil(this.unsubscribe$)).subscribe(res => {
      this.profileImage = res?.profile_image ? (this.staticFilePipe.transform(res.profile_image) as string) : '';
      this.staff = {
        ...res
      };
    });
  }

  openChangePasswordDialog(): void {
    const dialogRef = this.dialog.open(ChangePasswordComponent, {
      width: '700px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const data = {
          old_password: result.old_password,
          new_password: result.new_password,
          staffs: this.staff._id
        };

        this.profileService
          .changePassword(data)
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe({
            next: () => {
              this.snackbarService.onShowSnackbar({ message: 'change-password', component: SnackbarComponent });
            }
          });
      }
    });
  }

  trackByFn(index: number, item: any): void {
    return item?._id ?? index ?? item?.name ?? item;
  }
}

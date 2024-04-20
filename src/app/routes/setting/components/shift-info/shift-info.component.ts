import { Component } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { ActivatedRoute, Router } from '@angular/router';
import { pAdmin } from 'src/app/helpers/permission';
import { Shift } from 'src/app/models/shift';
import { DialogService } from 'src/app/services/dialog.service';
import { ShiftService } from 'src/app/services/shift.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { SnackbarComponent } from 'src/app/shares/snackbar/components/snackbar/snackbar.component';

@Component({
  selector: 'app-shift-info',
  templateUrl: './shift-info.component.html',
  styleUrls: ['./shift-info.component.scss']
})
export class ShiftInfoComponent {

  pShift = pAdmin.shift;
  shiftId: string;
  info: Shift;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private shiftService: ShiftService,
    private dialogService: DialogService,
    private snackbarService: SnackbarService
  ) {
    this.shiftId = this.route.snapshot.paramMap.get('id');
  }
  
  ngOnInit(): void {
    this.getInfo();
  }

  getInfo() {
    this.shiftService.getById(this.shiftId).subscribe({
      next: (res) => {
        this.info = res;
      }
    });
  }

  onDelete() {
    this.dialogService
      .onShowDialog({
        title: 'លុបគ្រប់គ្រងវេន',
        message: 'តើអ្នកពិតជាចង់លុបគ្រប់គ្រងវេននេះមែនទេ?'
      })
      .afterClosed()
      .subscribe(res => {
        if (res === 'confirm') {
          this.shiftService.delete(this.shiftId).subscribe({
            next: () => {
              this.snackbarService.onShowSnackbar({ message: 'delete', component: SnackbarComponent });
              this.router.navigate(['../../'], { relativeTo: this.route });
            }
          });
        }
      });
  }
  
}

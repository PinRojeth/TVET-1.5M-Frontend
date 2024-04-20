import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { pAdmin } from 'src/app/helpers/permission';
import { Sector } from 'src/app/models/sector';
import { DialogService } from 'src/app/services/dialog.service';
import { SectorService } from 'src/app/services/sector.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { SnackbarComponent } from 'src/app/shares/snackbar/components/snackbar/snackbar.component';

@Component({
  selector: 'app-sector-info',
  templateUrl: './sector-info.component.html',
  styleUrls: ['./sector-info.component.scss']
})
export class SectorInfoComponent {

  pSector = pAdmin.sector;
  sectorId: string;
  info: Sector;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private majorService: SectorService,
    private dialogService: DialogService,
    private snackbarService: SnackbarService
  ) {
    this.sectorId = this.route.snapshot.paramMap.get('sectorId');
  }
  
  ngOnInit(): void {
    this.getInfo();
  }

  getInfo() {
    this.majorService.getById(this.sectorId).subscribe({
      next: (res) => {
        this.info = res;
      },
      error: (err) => {
        this.snackbarService.onShowSnackbar({
          message:
            err.error?.errors instanceof Array
              ? err.error?.errors[0].msg
              : err.error?.message ?? 'Something went wrong',
          isError: true
        });
      }
    });
  }

  onDelete() {
    this.dialogService
      .onShowDialog({
        title: 'លុបវិស័យ',
        message: 'តើអ្នកពិតជាចង់លុបវិស័យនេះមែនទេ?'
      })
      .afterClosed()
      .subscribe(res => {
        if (res === 'confirm') {
          this.majorService.delete(this.sectorId).subscribe({
            next: () => {
              this.snackbarService.onShowSnackbar({ message: 'delete', component: SnackbarComponent });
              this.router.navigate(['../../'], { relativeTo: this.route });
            }
          });
        }
      });
  }
}

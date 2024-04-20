import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { pAdmin } from 'src/app/helpers/permission';
import { Major } from 'src/app/models/major';
import { DialogService } from 'src/app/services/dialog.service';
import { MajorService } from 'src/app/services/major.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { SnackbarComponent } from 'src/app/shares/snackbar/components/snackbar/snackbar.component';

@Component({
  selector: 'app-major-info',
  templateUrl: './major-info.component.html',
  styleUrls: ['./major-info.component.scss']
})
export class MajorInfoComponent implements OnInit {
  
  pApplyMajor = pAdmin.applyMajor;
  majorId: string;
  info: Major;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private majorService: MajorService,
    private dialogService: DialogService,
    private snackbarService: SnackbarService
  ) {
    this.majorId = this.route.snapshot.paramMap.get('majorId');
  }
  
  ngOnInit(): void {
    this.getInfo();
  }

  getInfo() {
    this.majorService.getById(this.majorId).subscribe({
      next: (res) => {
        this.info = res;
      }
    });
  }

  onDelete() {
    this.dialogService
      .onShowDialog({
        title: 'លុបជំនាញ',
        message: 'តើអ្នកពិតជាចង់លុបជំនាញនេះមែនទេ?'
      })
      .afterClosed()
      .subscribe(res => {
        if (res === 'confirm') {
          this.majorService.delete(this.majorId).subscribe({
            next: () => {
              this.snackbarService.onShowSnackbar({ message: 'delete', component: SnackbarComponent });
              this.router.navigate(['../../'], { relativeTo: this.route });
            }
          });
        }
      });
  }

}

import { Component, inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { pAdmin } from 'src/app/helpers/permission';
import { DESTROYER$ } from 'src/app/helpers/unsubscribe';
import { Attendance } from 'src/app/models/attendance';
import { Student } from 'src/app/models/student';
import { AttendanceService } from 'src/app/services/attendance.service';
import { LoadingService } from 'src/app/services/loading.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { environment } from 'src/environments/environment';
import { DialogService } from './../../../../services/dialog.service';

@Component({
  selector: 'app-attendance-record-info',
  templateUrl: './attendance-record-info.component.html',
  styleUrls: ['./attendance-record-info.component.scss']
})
export class AttendanceRecordInfoComponent {
  private readonly destroyer$ = DESTROYER$();

  readonly loadingService = inject(LoadingService);
  private readonly attendanceService = inject(AttendanceService);
  private readonly route = inject(ActivatedRoute);
  private readonly dialogService = inject(DialogService);
  private snackbarService = inject(SnackbarService);
  private readonly router = inject(Router);

  pAttendance = pAdmin.attendance;

  tableDataSource = new MatTableDataSource<Student>();
  displayedColumns: string[] = ['position', 'name', 'poor_id', 'attendance_score'];

  data: Attendance;

  attendanceId: string = this.route.snapshot.params?.attendance;
  requestUrl: string = `${environment.api_url}${this.attendanceService.path}/${this.attendanceId}`;

  ngOnInit(): void {
    this.onLoad();
  }

  onLoad(): void {
    this.attendanceService
      .getOne(this.attendanceId)
      .pipe(takeUntil(this.destroyer$))
      .subscribe({
        next: res => {
          this.tableDataSource = new MatTableDataSource(res.data);
          this.data = res;
        }
      });
  }

  onDelete() {
    this.dialogService
      .onShowDialog({
        title: 'លុបកំណត់ត្រាវត្ត',
        message: 'តើអ្នកពិតជាចង់កំណត់ត្រាវត្តមាននេះមែនទេ?'
      })
      .afterClosed()
      .subscribe(res => {
        if (res === 'confirm') {
          this.attendanceService.delete(this.attendanceId).subscribe({
            next: () => {
              this.snackbarService.onShowSnackbar({ message: 'delete' });
              this.router.navigate(['../../'], { relativeTo: this.route });
            }
          });
        }
      });
  }
}

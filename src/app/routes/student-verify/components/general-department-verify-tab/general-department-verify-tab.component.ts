import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { pAdmin } from 'src/app/helpers/permission';
import { DESTROYER$ } from 'src/app/helpers/unsubscribe';
import EnumConstant from 'src/app/models/enums/enumConstant';
import { Student } from 'src/app/models/student';
import { GeneralDepartmentVerifyService } from 'src/app/services/general-department-verify.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { ConfirmDialogComponent } from 'src/app/shares/confirm-dialog/components/confirm-dialog/confirm-dialog.component';
import { TabNavBar } from 'src/app/shares/tab-nav-bar/tab-nav-bar';
import { StudentVerifyDetailRejectDialogComponent } from '../student-verify-detail-reject-dialog/student-verify-detail-reject-dialog.component';

@Component({
  selector: 'app-general-department-verify-tab',
  templateUrl: './general-department-verify-tab.component.html',
  styleUrls: ['./general-department-verify-tab.component.scss']
})
export class GeneralDepartmentVerifyTabComponent {
  private readonly destroyer$ = DESTROYER$();

  private readonly route = inject(ActivatedRoute);
  private readonly studentService = inject(GeneralDepartmentVerifyService);
  private readonly dialog = inject(MatDialog);
  private readonly snackbarService = inject(SnackbarService);

  pStudent = pAdmin.approvalInfoStudent;

  studentId: string = this.route.snapshot.params.studentId;
  poorId: string = this.route.snapshot.queryParamMap.get('poorId');
  tab: string = this.route.snapshot.params.tab;
  name: string = this.route.snapshot.queryParamMap.get('student');

  student: Student;

  reload: boolean;

  links: TabNavBar[] = [
    {
      index: 0,
      tab: 'info',
      label: 'ព័ត៌មាន'
    },
    {
      index: 1,
      tab: 'timeline',
      label: 'កំណត់ហេតុ'
    }
  ];

  activeLink: number = this.links.find(value => value.tab === this.tab)?.index ?? 0;

  status: typeof EnumConstant = EnumConstant;

  isLoaded: boolean;

  onGetStudent(student: Student): void {
    this.isLoaded = false;
    this.student = student;
    this.reload = false;

    setTimeout(() => {
      this.isLoaded = true;
    }, 0);
  }

  onApprove(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '450px',
      data: {
        icon: 'assets/icons/approve-illustrate.svg',
        title: 'អនុម័តលើសំណើ',
        message: 'ព័ត៌មានរបស់បេក្ខជនត្រូវបានផ្ទៀងផ្ទាត់ជាមួយបណ្ណសមធម៌យ៉ាងត្រឹមត្រូវ',
        button: 'approve'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'approve') {
        this.onVerifyRequest(this.status.APPROVED);
      }
    });
  }

  onReject(): void {
    const dialogRef = this.dialog.open(StudentVerifyDetailRejectDialogComponent, {
      width: '400px',
      data: { title: 'បដិសេធ' }
    });
    dialogRef.afterClosed().subscribe((reason: string) => {
      if (!!reason) {
        this.onVerifyRequest(this.status.REJECT, reason);
      }
    });
  }

  onVerifyRequest(status: number, reason?: string): void {
    this.studentService
      .verifyRequest({ status: status, reason: reason }, this.studentId)
      .pipe(takeUntil(this.destroyer$))
      .subscribe({
        next: () => {
          let message: string = status === this.status.APPROVED ? 'សំណើត្រូវបានអនុម័ត' : 'សំណើត្រូវបានបដិសេធ';
          this.snackbarService.onShowSnackbar({ message: message });
          this.reload = true;
          this.isLoaded = false;
        }
      });
  }

  onReRequest(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        icon: 'assets/icons/request.png',
        title: 'សំណើ',
        message: 'ព័ត៌មានបេក្ខជនបានបំពេញត្រឹមត្រូវ និងរួចរាល់សម្រាប់ការដាក់ស្នើ',
        button: 'confirm'
      }
    });
    dialogRef.afterClosed().subscribe((res: string) => {
      if (res === 'confirm') {
        this.studentService
          .reRequest(this.studentId)
          .pipe(takeUntil(this.destroyer$))
          .subscribe({
            next: () => {
              this.snackbarService.onShowSnackbar({ message: 'សំណើត្រូវបានដាក់ស្នើរួចរាល់' });
              this.reload = true;
              this.isLoaded = false;
            }
          });
      }
    });
  }

  trackByFn(index: number, item: any): void {
    return item?._id ?? index ?? item?.name ?? item;
  }
}

import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { pAdmin } from 'src/app/helpers/permission';
import { DESTROYER$, Unsubscribe } from 'src/app/helpers/unsubscribe';
import { Student } from 'src/app/models/student';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { StudentService } from 'src/app/services/student.service';
import { ConfirmDialogComponent } from 'src/app/shares/confirm-dialog/components/confirm-dialog/confirm-dialog.component';
import { ResetPasswordComponent } from 'src/app/shares/confirm-dialog/components/reset-password/reset-password.component';
import { FullNamePipe } from 'src/app/shares/name/pipes/full-name.pipe';
import { PoorIdInputComponent } from 'src/app/shares/poor-id-adding/components/poor-id-input/poor-id-input.component';
import { SnackbarComponent } from 'src/app/shares/snackbar/components/snackbar/snackbar.component';
import { TabNavBar } from 'src/app/shares/tab-nav-bar/tab-nav-bar';
import { AddUserDialogComponent } from '../add-user-dialog/add-user-dialog.component';
import { StudentFinishChangeCourseDialogComponent } from '../student-finish-change-course-dialog/student-finish-change-course-dialog.component';
import { StudentRequestQuitDialogComponent } from '../student-request-quit-dialog/student-request-quit-dialog.component';

@Component({
  selector: 'app-student-finish-tab',
  templateUrl: './student-finish-tab.component.html',
  styleUrls: ['./student-finish-tab.component.scss'],
  providers: [FullNamePipe]
})
export class StudentFinishTabComponent extends Unsubscribe {
  private readonly destroyer$ = DESTROYER$();

  private readonly route = inject(ActivatedRoute);
  public readonly translate = inject(TranslateService);
  private readonly router = inject(Router);
  private readonly studentService = inject(StudentService);
  private readonly dialog = inject(MatDialog);
  private readonly snackbarService = inject(SnackbarService);
  private readonly fullNamePipe = inject(FullNamePipe);

  pStudent = pAdmin.student;

  studentId: string = this.route.snapshot.params.studentId;
  tab: string = this.route.snapshot.params.tab;
  name: any;
  student: Student;

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

  isApproved: boolean = this.router.url.includes('approved/info');

  isReload: boolean;

  constructor() {
    super();
  }

  ngOnInit(): void {}

  onGetStudent(student: Student): void {
    this.student = student;

    if (!this.name) this.name = this.fullNamePipe.transform(student);
  }

  onRequestQuit(): void {
    this.dialog
      .open(StudentRequestQuitDialogComponent, {
        width: '550px',
        data: { studentId: this.studentId }
      })
      .afterClosed()
      .subscribe(result => {
        if (!!result) {
          this.studentService
            .requestQuit(result)
            .pipe(takeUntil(this.destroyer$))
            .subscribe({
              next: res => {
                this.router.navigate(['../../../../', 'approved', 'info', this.studentId, 'info'], {
                  relativeTo: this.route
                });
                this.snackbarService.onShowSnackbar({ message: 'success' });
                this.isReload = true;

                setTimeout(() => {
                  this.isReload = false;
                }, 500);
              }
            });
        }
      });
  }

  onResume() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        icon: 'assets/icons/confirm-ic.svg',
        title: 'បេក្ខជនបន្តការសិក្សា',
        message: 'តើបេក្ខជននេះពិតបានមកបន្តការសិក្សាមែនទេ?',
        button: 'okay'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.studentService
          .requestResume({ students: this.studentId })
          .pipe(takeUntil(this.destroyer$))
          .subscribe({
            next: () => {
              this.router.navigate(['../../../../', 'approved', 'info', this.studentId, 'info'], {
                relativeTo: this.route
              });
              this.snackbarService.onShowSnackbar({ message: 'success' });
              this.isReload = true;

              setTimeout(() => {
                this.isReload = false;
              }, 500);
            }
          });
      }
    });
  }

  openResetPasswordDialog() {
    const dialogRef = this.dialog.open(ResetPasswordComponent, {
      width: '700px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const data = {
          'students': this.studentId,
          'new_password': result.new_password
        };

        this.studentService
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

  openAddUserDialog() {
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      width: '700px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const data = {
          'students': this.studentId,
          'username': result.username,
          'password': result.password
        };

        this.studentService
          .addUser(data)
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe({
            next: () => {
              this.snackbarService.onShowSnackbar({ message: 'Add user', component: SnackbarComponent });
            }
          });
      }
    });
  }

  onAddPoorId(): void {
    const dialogRef = this.dialog.open(PoorIdInputComponent, {
      width: '700px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(res => {
      if (!!res) this.addPoorId(res);
    });
  }

  addPoorId(data: { poor_id: string; poor_member_uuid: string }): void {
    this.studentService
      .addPoorId({ poor_id: data.poor_id, poor_member_uuid: data.poor_member_uuid }, this.student?._id)
      .pipe(takeUntil(this.destroyer$))
      .subscribe({
        next: res => {
          this.snackbarService.onShowSnackbar({ message: 'edit' });
          this.isReload = true;

          setTimeout(() => {
            this.isReload = false;
          }, 500);
        }
      });
  }

  onChangeCourse(): void {
    const dialogRef = this.dialog.open(StudentFinishChangeCourseDialogComponent, {
      width: '700px',
      data: { students: this.studentId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.studentService
          .changeCourse(this.studentId, result)
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe({
            next: () => {
              this.snackbarService.onShowSnackbar({ message: 'edit' });

              this.isReload = true;

              setTimeout(() => {
                this.isReload = false;
              }, 500);
            }
          });
      }
    });
  }

  trackByFn(index: number, item: any): void {
    return item?._id ?? index ?? item?.name ?? item;
  }
}

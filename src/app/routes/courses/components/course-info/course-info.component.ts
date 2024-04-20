import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { takeUntil } from 'rxjs';
import { pAdmin } from 'src/app/helpers/permission';
import { Unsubscribe } from 'src/app/helpers/unsubscribe';
import { Course } from 'src/app/models/course';
import { CourseService } from 'src/app/services/course.service';
import { DialogService } from 'src/app/services/dialog.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { ConfirmDialogComponent } from 'src/app/shares/confirm-dialog/components/confirm-dialog/confirm-dialog.component';
import { SnackbarComponent } from 'src/app/shares/snackbar/components/snackbar/snackbar.component';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.scss']
})
export class CourseInfoComponent extends Unsubscribe{
  pCourse = pAdmin.course;
  courseId: string;
  info: Course;
  
  total = 0;
  totalFemale = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private courseService: CourseService,
    private dialogService: DialogService,
    private snackbarService: SnackbarService,
    private dialog: MatDialog,
    public translate: TranslateService
  ) {
    super();
    this.courseId = this.route.snapshot.paramMap.get('courseId');
  }
  
  ngOnInit(): void {
    this.getInfo();
  }

  getInfo() {
    this.courseService.getById(this.courseId).subscribe({
      next: (res) => {
        this.info = res;
      }
    });
  }

  onDelete() {
    this.dialogService
      .onShowDialog({
        title: 'លុបវគ្គសិក្សា',
        message: 'តើអ្នកពិតជាចង់លុបវគ្គសិក្សានេះមែនទេ?'
      })
      .afterClosed()
      .subscribe(res => {
        if (res === 'confirm') {
          this.courseService.delete(this.courseId).subscribe({
            next: () => {
              this.snackbarService.onShowSnackbar({ message: 'delete', component: SnackbarComponent });
              this.router.navigate(['../../'], { relativeTo: this.route });
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
          (this.info.status === 1
            ? this.translate.instant('button.disable_course')
            : this.translate.instant('button.enable_course')),
        message:
          (this.info.status === 1
            ? this.translate.instant('button.disable_course')
            : this.translate.instant('button.enable_course')) +
          '.',
        button: 'confirm'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.courseService
          .setStatus(this.courseId, {
            status: this.info.status === 1 ? -2 : 1
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
  onSetArchive(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        icon: 'assets/icons/confirm-ic.svg',
        title:
          this.translate.instant('dialog.title_acc') +
          (this.info.status === 1
            ? this.translate.instant('button.disable_course')
            : this.translate.instant('button.enable_course')),
        message:
          (this.info.status === 1
            ? this.translate.instant('button.disable_course')
            : this.translate.instant('button.enable_course')) +
          '.',
        button: 'confirm'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.courseService
          .setArchive(this.courseId, {
            archive: this.info.archive === 1 ? 0 : 1
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

  trackByFn(index: number, item: any): void {
    return item?._id ?? index ?? item?.name ?? item;
  }

}

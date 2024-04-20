import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { takeUntil } from 'rxjs/operators';
import { pAdmin } from 'src/app/helpers/permission';
import { DESTROYER$, Unsubscribe } from 'src/app/helpers/unsubscribe';
import { Address } from 'src/app/models/address';
import { BaseDatatable } from 'src/app/models/datatables/base.datatable';
import EnumConstant from 'src/app/models/enums/enumConstant';
import { TableColumn } from 'src/app/models/table-column';
import { StudentFinishChangeCourseDialogComponent } from 'src/app/routes/approved-student/components/student-finish-change-course-dialog/student-finish-change-course-dialog.component';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { StudentService } from 'src/app/services/student.service';
import { ConfirmDialogComponent } from 'src/app/shares/confirm-dialog/components/confirm-dialog/confirm-dialog.component';
import { RejectDialogWithMsgComponent } from 'src/app/shares/confirm-dialog/components/reject-dialog-with-msg/reject-dialog-with-msg.component';
import { PoorIdInputComponent } from 'src/app/shares/poor-id-adding/components/poor-id-input/poor-id-input.component';

@Component({
  selector: 'app-pending-info',
  templateUrl: './pending-info.component.html',
  styleUrls: ['./pending-info.component.scss']
})
export class PendingInfoComponent extends Unsubscribe implements OnInit {
  private readonly destroyer$ = DESTROYER$();

  pStudent = pAdmin.student;
  studentRequestId: string;
  student: any;
  address: Address;
  isLoading = false;
  poorMemberUuId: string;
  checkIndex = -1;

  isReload: boolean;

  tableColumns: TableColumn[] = [
    {
      name: 'table.name',
      dataKey: 'name',
      custom: true,
      isSortable: true
    },
    {
      name: 'table.gender',
      dataKey: 'gender',
      custom: true
    },
    {
      name: 'table.date_birth',
      dataKey: 'dob',
      custom: true
    },
    {
      name: 'Relation To Head',
      dataKey: 'rth',
      custom: true
    },
    {
      name: 'ជ្រើសរើសសមាជិក',
      dataKey: 'candidate',
      custom: true
    }
  ];
  tableData: BaseDatatable<Partial<any>> = {
    page: 1,
    limit: 0,
    list: [],
    total: 0
  };

  poorMemberUu: any;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    public translate: TranslateService,
    private studentService: StudentService,
    private snackbarService: SnackbarService,
  ) {
    super();
    this.studentRequestId = this.route.snapshot.paramMap.get('studentRequestId');
  }

  ngOnInit(): void {
    this.getInfo();
  }

  getInfo() {
    this.studentService.getApprovedOne(this.studentRequestId, { query_poor_data: true }).subscribe({
      next: res => {
        this.isLoading = true;
        this.student = res;
        this.address = this.student?.poor_card_data?.address;

        const family_members = this.student?.poor_card_data?.family_members;
        this.tableData = {
          ...this.tableData,
          list: family_members?.map(element => ({ ...element, checked: false }))
        };
      }
    });
  }

  openApprovalDialog(value: EnumConstant) {
    if (value === EnumConstant.APPROVED) {
      if (!this.student.address?.city_provinces) {
        return this.snackbarService.onShowSnackbar({ message: 'សូមបញ្ចូលអាសយដ្ឋាន', isError: true });
      }
      if (this.student?.poor_id) {
        if (!this.poorMemberUu) {
          return this.snackbarService.onShowSnackbar({ message: 'សូមជ្រើសរើសសមាជិក', isError: true });
        }
      }
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        width: '450px',
        data: {
          icon: 'assets/icons/approve-illustrate.svg',
          title: this.translate.instant('dialog.request.title'),
          message: this.translate.instant('dialog.request.request_msg'),
          button: 'approve'
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result === 'approve') {
          const obj = {
            status: EnumConstant.APPROVED,
            poor_member_uuid: this.poorMemberUuId
          };
          this.approval(obj);
        }
      });
    } else if (value === EnumConstant.REJECT) {

      const dialogRef = this.dialog.open(RejectDialogWithMsgComponent, {
        width: '400px',
        data: {
          title: this.translate.instant('dialog.request.rejected'),
          optional_reason: true
        }
      });

      dialogRef.afterClosed().subscribe((res: any) => {
        if(res?.reason) {
          const obj = {
            status: EnumConstant.REJECT,
            reason: res.reason
          };
          this.approval(obj)
        }
      });

      // const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      //   width: '400px',
      //   data: {
      //     icon: 'assets/icons/reject.svg',
      //     title: this.translate.instant('dialog.request.rejected'),
      //     message: this.translate.instant('dialog.request.rejected_msg'),
      //     button: 'reject'
      //   }
      // });

      // dialogRef.afterClosed().subscribe((res: any) => {
      //   if (res == 'reject') {
      //     const obj = {
      //       status: EnumConstant.REJECT
      //     };
      //     this.approval(obj);
      //   }
      // });
    }
  }

  approval(obj: any) {
    const data = {
      students: this.studentRequestId,
      ...obj
    };
    this.studentService.approval(data).subscribe({
      next: (res: any) => {
        this.snackbarService.onShowSnackbar({
          message: res?.status == EnumConstant.APPROVED ? 'Approved' : 'Rejected'
        });
        this.router.navigate(['../../'], { relativeTo: this.route });
      }
    });
  }

  requestApproval(obj: any) {
    const data = {
      students: this.studentRequestId,
      ...obj
    };
    this.studentService.approval(data).subscribe({
      next: (res: any) => {
        this.snackbarService.onShowSnackbar({ message: 'request_poor' });
        this.router.navigate(['../../'], { relativeTo: this.route });
      }
    });
  }

  openResendDialog(value: EnumConstant) {
    if (value === EnumConstant.DRAFT) {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        width: '400px',
        data: {
          icon: 'assets/icons/request.png',
          title: this.translate.instant('dialog.request.draft_scholarship'),
          message: this.translate.instant('dialog.request.draft_sms'),
          button: 'resend_scholarship'
        }
      });

      dialogRef.afterClosed().subscribe((res: any) => {
        if (res === 'resend_scholarship') {
          const data = {
            status: EnumConstant.DRAFT,
            students: this.studentRequestId
          };

          this.studentService.applyRequest(data).subscribe({
            next: () => {
              this.snackbarService.onShowSnackbar({ message: 'dialog.draft_scholarship' });
              this.router.navigate(['../../'], { relativeTo: this.route });
            }
          });
        }
      });
    }
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
      .addPoorId({ poor_id: data.poor_id, poor_member_uuid: data.poor_member_uuid }, this.studentRequestId)
      .pipe(takeUntil(this.destroyer$))
      .subscribe({
        next: res => {
          this.snackbarService.onShowSnackbar({ message: 'edit' });
          this.getInfo();
        }
      });
  }

  onEdit() {
    this.router.navigate(['../../', 'edit', this.studentRequestId], { relativeTo: this.route });
  }

  onCheck(item): void {
    this.poorMemberUu = this.poorMemberUu !== item ? item : null;
    this.poorMemberUuId = item.uuid;
  }

  exists(item) {
    return this.poorMemberUu !== item ? false : true;
  }

  trackByFn(index: number, item: any): void {
    return item?._id ?? index ?? item?.name ?? item;
  }

  onChangeCourse(): void {
    const dialogRef = this.dialog.open(StudentFinishChangeCourseDialogComponent, {
      width: '700px',
      data: { students: this.studentRequestId, requesting: 1 }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.studentService
          .changeCourse(this.studentRequestId, result)
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
}

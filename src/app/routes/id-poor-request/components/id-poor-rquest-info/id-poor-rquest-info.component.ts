import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { pAdmin } from 'src/app/helpers/permission';
import { DESTROYER$ } from 'src/app/helpers/unsubscribe';
import { Address } from 'src/app/models/address';
import { BaseDatatable } from 'src/app/models/datatables/base.datatable';
import EnumConstant, { StudentFinishEnum } from 'src/app/models/enums/enumConstant';
import { TableColumn } from 'src/app/models/table-column';
import { PoorStudentService } from 'src/app/services/poor-student.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { ConfirmDialogComponent } from 'src/app/shares/confirm-dialog/components/confirm-dialog/confirm-dialog.component';
import { RejectDialogWithMsgComponent } from 'src/app/shares/confirm-dialog/components/reject-dialog-with-msg/reject-dialog-with-msg.component';

@Component({
  selector: 'app-id-poor-rquest-info',
  templateUrl: './id-poor-rquest-info.component.html',
  styleUrls: ['./id-poor-rquest-info.component.scss']
})
export class IdPoorRquestInfoComponent {
  pStudent = pAdmin.poorStudent;
  studentRequestId: string;
  student: any;
  address: Address;
  readonly studentFinishEnum = StudentFinishEnum;
  private readonly destroyer$ = DESTROYER$();
  @Output() name: EventEmitter<string> = new EventEmitter();
  isLoading = false;

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
    }
  ];
  tableData: BaseDatatable<Partial<any>> = {
    page: 1,
    limit: 0,
    list: [],
    total: 0
  };

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    public translate: TranslateService,
    private studentService: PoorStudentService,
    private snackbarService: SnackbarService
  ) {
    this.studentRequestId = this.route.snapshot.paramMap.get('poorStudentId');
  }

  ngOnInit(): void {
    this.getInfo();
  }

  getInfo() {
    this.studentService.getPoorStudentById(this.studentRequestId).subscribe({
      next: (res) => {
        this.isLoading = true
        this.student = res;
        this.address = this.student?.poor_card_data?.address;

        const family_members = this.student?.poor_card_data?.family_members;
        this.tableData = {
          ...this.tableData,
          list: family_members
        };
      }
    });
  }

  openApprovalDialog(value: EnumConstant) {
    if (value == EnumConstant.APPROVED) {
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
            poor_status: EnumConstant.APPROVED
          };
          this.approval(obj);
        }
      });
    }

    else if (value === EnumConstant.REJECT) {
      const dialogRef = this.dialog.open(RejectDialogWithMsgComponent, {
        width: '400px',
        data: {
          title: this.translate.instant('dialog.request.rejected'),
        }
      });

      dialogRef.afterClosed().subscribe((res: any) => {
        if(res?.reason) {
          const obj = {
            poor_status: EnumConstant.REJECT,
            reason: res.reason
          };
          this.approval(obj)
        }
      });
    }
  }

  openResendDialog(value: EnumConstant) {

    if (value === EnumConstant.DRAFT) {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        width: '400px',
        data: {
          icon: 'assets/icons/request.png',
          title: this.translate.instant('dialog.request.draft'),
          message: this.translate.instant('dialog.request.draft_sms'),
          button: 'resend'
        }
      });

      dialogRef.afterClosed().subscribe((res: any) => {
        if(res === 'resend') {
          const data = {
            poor_status: EnumConstant.DRAFT,
            students: this.studentRequestId,
          };

          this.studentService.applyRequest(data).subscribe({
            next: () => {
              this.snackbarService.onShowSnackbar({ message: 'dialog.draft' });
              this.router.navigate(['../../'], { relativeTo: this.route });
            }
          })
        }
      });
    }
  }

  approval(obj: any) {
    const data = {
      students: this.studentRequestId,
      ...obj
    };
    this.studentService.approval(data).subscribe({
      next: (res: any) => {
        this.snackbarService.onShowSnackbar({ message: res?.poor_status == EnumConstant.APPROVED ? 'Approved' : 'Rejected' });
        this.router.navigate(['../../'], { relativeTo: this.route });
      }
    });
  }

  trackByFn(index: number, item: any): void {
    return item?._id ?? index ?? item?.name ?? item;
  }
}

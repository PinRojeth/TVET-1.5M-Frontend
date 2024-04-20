import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { pAdmin } from 'src/app/helpers/permission';
import { BaseDatatable } from 'src/app/models/datatables/base.datatable';
import { Shift } from 'src/app/models/shift';
import { TableColumn } from 'src/app/models/table-column';
import { DialogService } from 'src/app/services/dialog.service';
import { ShiftService } from 'src/app/services/shift.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { Pagination } from 'src/app/shares/pagination/pagination';
import { SnackbarComponent } from 'src/app/shares/snackbar/components/snackbar/snackbar.component';

@Component({
  selector: 'app-shift',
  templateUrl: './shift.component.html',
  styleUrls: ['./shift.component.scss']
})
export class ShiftComponent {

  pShift = pAdmin.shift;

  params = {
    limit: 10,
    page: 1,
    search: ''
  };
  tableColumns: TableColumn[] = [
    {
      name: 'table.name',
      dataKey: 'name',
      custom: true,
      isSortable: true
    },
    {
      name: 'table.name_en',
      dataKey: 'name_en',
      custom: true
    },
    {
      name: 'table.code',
      dataKey: 'code',
      custom: true
    },
    {
      name: 'table.action',
      dataKey: 'action',
      custom: true
    }
  ];
  tableData: BaseDatatable<Shift>;
  shiftTimes: any[];
  test: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public shiftService: ShiftService,
    private dialogService: DialogService,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.getShifts();
  }

  getShifts(pagination?: Pagination) {

    const params = { ...this.params, ...pagination };
    this.shiftService.getMany(params).subscribe({
      next: (res) => {
        this.tableData = res;
      }
    });
  }

  onCreate() {
    this.router.navigate(['create'], { relativeTo: this.route });
  }

  actionEvent(button: string, id: string): void {
    if (button === 'delete') {
      this.onDelete(id);
    }
  }

  onDelete(id: string) {
    this.dialogService
      .onShowDialog({
        title: 'លុបគ្រប់គ្រងវេន',
        message: 'តើអ្នកពិតជាចង់លុបគ្រប់គ្រងវេននេះមែនទេ?'
      })
      .afterClosed()
      .subscribe(res => {
        if (res === 'confirm') {
          this.shiftService.delete(id).subscribe({
            next: () => {
              this.snackbarService.onShowSnackbar({ message: 'delete', component: SnackbarComponent });
              this.getShifts();
            }
          });
        }
      });
  }

  //TODO: searching functions
  timer: ReturnType<typeof setTimeout>;
  onSearch(value: string) {
    this.params.search = value;
    this.startSearch();
  }
  startSearch() {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.getShifts(), 500);
  }

  goTo(pagination: Pagination) {
    this.getShifts(pagination);
  }
}

import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { pAdmin } from 'src/app/helpers/permission';
import { BaseDatatable } from 'src/app/models/datatables/base.datatable';
import { Department } from 'src/app/models/department';
import { TableColumn } from 'src/app/models/table-column';
import { DepartmentService } from 'src/app/services/department.service';
import { DialogService } from 'src/app/services/dialog.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { Pagination } from 'src/app/shares/pagination/pagination';
import { SnackbarComponent } from 'src/app/shares/snackbar/components/snackbar/snackbar.component';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent {
  pDepartment = pAdmin.userDepartment;

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
  tableData: BaseDatatable<Department>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public  departmentService: DepartmentService,
    private dialogService: DialogService,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.getShifts();
  }

  getShifts(pagination?: Pagination) {

    const params = { ...this.params, ...pagination };
    this.departmentService.getMany(params).subscribe({
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
        title: 'លុបគ្រប់គ្រងស្ថាប័ន',
        message: 'តើអ្នកពិតជាចង់លុបគ្រប់គ្រងស្ថាប័ននេះមែនទេ?'
      })
      .afterClosed()
      .subscribe(res => {
        if (res === 'confirm') {
          this.departmentService.delete(id).subscribe({
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

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { pAdmin } from 'src/app/helpers/permission';
import { BaseDatatable } from 'src/app/models/datatables/base.datatable';
import { Major } from 'src/app/models/major';
import { TableColumn } from 'src/app/models/table-column';
import { DialogService } from 'src/app/services/dialog.service';
import { MajorService } from 'src/app/services/major.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { Pagination } from 'src/app/shares/pagination/pagination';
import { SnackbarComponent } from 'src/app/shares/snackbar/components/snackbar/snackbar.component';

@Component({
  selector: 'app-major-list',
  templateUrl: './major-list.component.html',
  styleUrls: ['./major-list.component.scss']
})
export class MajorListComponent implements OnInit {

  pApplyMajor = pAdmin.applyMajor;

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
      name: 'table.sector',
      dataKey: 'sector',
      custom: true
    },
    {
      name: 'table.action',
      dataKey: 'action',
      custom: true
    }
  ];
  tableData: BaseDatatable<Major>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public majorService: MajorService,
    private dialogService: DialogService,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.getMajors();
  }

  getMajors(pagination?: Pagination) {

    const params = { ...this.params, ...pagination };
    this.majorService.getMany(params).subscribe({
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
        title: 'លុបជំនាញ',
        message: 'តើអ្នកពិតជាចង់លុបជំនាញនេះមែនទេ?'
      })
      .afterClosed()
      .subscribe(res => {
        if (res === 'confirm') {
          this.majorService.delete(id).subscribe({
            next: () => {
              this.snackbarService.onShowSnackbar({ message: 'delete', component: SnackbarComponent });
              this.getMajors();
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
    this.timer = setTimeout(() => this.getMajors(), 500);
  }

  goTo(pagination: Pagination) {
    this.getMajors(pagination);
  }

}

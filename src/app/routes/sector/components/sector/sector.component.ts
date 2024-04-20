import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { pAdmin } from 'src/app/helpers/permission';
import { BaseDatatable } from 'src/app/models/datatables/base.datatable';
import { Sector } from 'src/app/models/sector';
import { TableColumn } from 'src/app/models/table-column';
import { DialogService } from 'src/app/services/dialog.service';
import { SectorService } from 'src/app/services/sector.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { Pagination } from 'src/app/shares/pagination/pagination';
import { SnackbarComponent } from 'src/app/shares/snackbar/components/snackbar/snackbar.component';

@Component({
  selector: 'app-sector',
  templateUrl: './sector.component.html',
  styleUrls: ['./sector.component.scss']
})
export class SectorComponent {

  pSector = pAdmin.sector;

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
  tableData: BaseDatatable<Sector>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public sectorService: SectorService,
    private dialogService: DialogService,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.getSectors();
  }

  getSectors(pagination?: Pagination) {

    const params = { ...this.params, ...pagination };
    this.sectorService.getMany(params).subscribe({
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
        title: 'លុបវិស័យ',
        message: 'តើអ្នកពិតជាចង់លុបវិស័យនេះមែនទេ?'
      })
      .afterClosed()
      .subscribe(res => {
        if (res === 'confirm') {
          this.sectorService.delete(id).subscribe({
            next: () => {
              this.snackbarService.onShowSnackbar({ message: 'delete', component: SnackbarComponent });
              this.getSectors();
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
    this.timer = setTimeout(() => this.getSectors(), 500);
  }

  goTo(pagination: Pagination) {
    this.getSectors(pagination);
  }
}

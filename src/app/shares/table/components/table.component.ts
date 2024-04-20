import { Component, ContentChildren, EventEmitter, Input, OnInit, Output, QueryList, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ZippyDirective } from '../../zippy/directive/zippy.directive';
import { Pagination } from '../../pagination/pagination';
import { BaseDatatable } from 'src/app/models/datatables/base.datatable';
import { LoadingService } from 'src/app/services/loading.service';
import { TableColumn } from 'src/app/models/table-column';
import { environment } from 'src/environments/environment';
import sortingDataAccessor from 'src/app/helpers/sorting-data-accessor';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

let nextId = 0;

@Component({
  selector: 'custom-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  // table data and column
  tableDataSource = new MatTableDataSource([]);
  displayedColumns: string[];

  contentId = `zippy-${nextId++}`;
  isLoading: boolean;

  params = {
    limit: 10,
    page: 1,
  };
  total = 0;
  url: string;
  dragDisabled = true;

  @ContentChildren(ZippyDirective) content!: QueryList<ZippyDirective>;
  @ViewChild(MatSort, { static: true }) matSort: MatSort;
  @ViewChild('table', { static: true }) table: MatTable<any>;

  @Input() isSortable = false;
  @Input() tableColumns: TableColumn[] = [];
  @Input() rowActionIcon: string;
  // this property needs to have a setter, to dynamically get changes from parent component
  @Input() set requestUrl(url: string) {
    this.url = url ? (environment.api_url + url) : "";
  };
  // this property needs to have a setter, to dynamically get changes from parent component
  @Input() set tableData(data: BaseDatatable<any>) {
    this.total = data?.total;
    this.params.limit = data?.limit;
    this.params.page = data?.page;
    this.setTableDataSource(data?.list);
  }

  @Input() isSelectedRow = false;
  @Input() isEnabledDrag = false;

  @Output() sort: EventEmitter<Sort> = new EventEmitter();
  @Output() rowAction: EventEmitter<any> = new EventEmitter<any>();
  @Output() goToEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() selectedRow: EventEmitter<any> = new EventEmitter<any>();
  // @Output() dropListDropped: EventEmitter<any> = new EventEmitter<any>();

  constructor(public loadingService: LoadingService) { }

  ngOnInit(): void {
    const columnNames = this.tableColumns.map((tableColumn: TableColumn) => tableColumn.name);
    if (this.rowActionIcon) {
      this.displayedColumns = ['position', ...columnNames, this.rowActionIcon];
    } else {
      this.displayedColumns = ['position', ...columnNames];
    }
  }

  setTableDataSource(data: any) {
    this.tableDataSource = new MatTableDataSource<any>(data);
    setTimeout(() => {
      this.sortData();
    }, 300);
  }

  sortData(): void {
    this.tableDataSource.sortingDataAccessor = (data, sortHeaderId) => {

      // if sortHeaderId is string of nested properties
      // Ex: subjects.name
      const position = sortHeaderId.indexOf('.');

      let nestedProperty: string;
      if (position != -1) {
        nestedProperty = sortHeaderId;
      }

      switch (sortHeaderId) {
        case nestedProperty:
          // Sorting on nested properties
          return sortingDataAccessor.nestedProperty(data, sortHeaderId);

        case 'fullName':
          // Sorting on user list
          // student listing and staff listing
          return data.last_name.toLowerCase() + ' ' + data.first_name.toLowerCase();

        case 'staffFullName':
          // Sorting on nested staffs properties
          return data.staffs?.last_name.toLowerCase() + ' ' + data.staffs?.first_name.toLowerCase();

        case 'studentFullName':
          // Sorting on nested students properties
          return data.students?.last_name.toLowerCase() + ' ' + data.students?.first_name.toLowerCase();

        default:
          return data[sortHeaderId];
      }
    };

    // this.tableDataSource.sort = this.matSort;
  }

  drop(event: CdkDragDrop<any[]>) {
    // Return the drag container to disabled.
    this.dragDisabled = true;

    const previousIndex = this.tableDataSource.data.findIndex((d) => d === event.item.data);

    moveItemInArray(this.tableDataSource.data, previousIndex, event.currentIndex);
    this.setTableDataSource(this.tableDataSource.data);
    // this.dropListDropped.emit(event as CdkDragDrop<any[]>);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tableDataSource.filter = filterValue.trim().toLowerCase();
  }

  emitRowAction(row: any) {
    this.rowAction.emit(row);
  }

  goTo(event: Pagination): void {
    this.goToEvent.emit(event)
  }

  onSelectedRow(row: any) {
    if (!this.isSelectedRow) return;
    this.selectedRow.emit(row);
  }

}

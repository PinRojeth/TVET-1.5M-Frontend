import { Component, EventEmitter, Output} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BaseDatatable } from 'src/app/models/datatables/base.datatable';
import { Student } from 'src/app/models/student';
import { TableColumn } from 'src/app/models/table-column';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-table-student-list',
  templateUrl: './table-student-list.component.html',
  styleUrls: ['./table-student-list.component.scss']
})
export class TableStudentListComponent {

  courseId: string;
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
      name: 'table.phone',
      dataKey: 'phone_number',
      custom: true
    },
    {
      name: 'form.poor_id',
      dataKey: 'poor_id',
      custom: true
    },
    {
      name: 'table.action',
      dataKey: 'action',
      custom: true
    }
  ];

  tableData: BaseDatatable<Student>;
  @Output() total: EventEmitter<number> = new EventEmitter();
  
  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    public translate: TranslateService
  ) {
    this.courseId = this.route.snapshot.paramMap.get('courseId');
  }
  
  ngOnInit(): void {
    this.getStudentList();
  }

  getStudentList() {
    this.courseService.getStudentList(this.courseId).subscribe({
      next: (res) => {
        this.tableData = {
          list: res.list,
          limit: 0,
          page: 1,
          total: 0
        }
        this.total.emit(res.total)
      }
    })
  }

}

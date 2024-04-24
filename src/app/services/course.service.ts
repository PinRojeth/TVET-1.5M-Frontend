import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { Course, CourseReport } from '../models/course';
import { BaseDatatable } from '../models/datatables/base.datatable';
import { Student } from '../models/student';
import { BaseCrudService } from './base-crud.service';

@Injectable({
  providedIn: 'root'
})
export class CourseService extends BaseCrudService<Course> {
  constructor(injector: Injector) {
    super(injector);
    this.path = '/admin/course';
  }

  setStatus(id: string, data: { status: 1 | -2 }): Observable<Course> {
    return this.requestService.patchJSON(this.path + '/' + id + '/set_active', { data });
  }
  setArchive(id: string, data: { archive: 1 | 0 }): Observable<Course> {
    return this.requestService.patchJSON(this.path + '/' + id + '/archive', { data });
  }

  getStudentFemale(id: string, data: { gender?: string }): Observable<BaseDatatable<Student>> {
    return this.requestService.getJSON(this.path + '/' + id + '/student', { data, is_loading: true });
  }

  getStudentList(id: string): Observable<BaseDatatable<Student>> {
    return this.requestService.getJSON(this.path + '/' + id + '/student');
  }

  getDataCourseByDateRange(data: { start_date: string; end_date: string }): Observable<BaseDatatable<Course>> {
    return this.requestService.getJSON(this.path + '/filter_date_data', { data, is_loading: true });
  }

  filterData(): Observable<unknown> {
    return this.requestService.getJSON(this.path + '/filter_data', {});
  }
}

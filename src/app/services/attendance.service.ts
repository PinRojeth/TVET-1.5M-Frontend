import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { Attendance, AttendanceRecord, AttendanceStudentRecord } from '../models/attendance';
import { Course } from '../models/course';
import { BaseDatatable } from '../models/datatables/base.datatable';
import { CheckMonthExisted, Student } from '../models/student';
import { Pagination } from '../shares/pagination/pagination';
import { BaseCrudService } from './base-crud.service';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService extends BaseCrudService<Attendance> {
  constructor(injector: Injector) {
    super(injector);
    this.path = '/admin/attendance';
  }

  /**
   * @record attendance
   */
  getOne(_id: string): Observable<Attendance> {
    return this.requestService.getJSON<Attendance>(this.path + '/' + _id, { is_loading: true });
  }
  record(data: AttendanceRecord): Observable<Attendance> {
    return this.requestService.postJSON<Attendance>(`${this.path}`, { data });
  }
  getCourse(data: Pagination): Observable<BaseDatatable<Course>> {
    return this.requestService.getJSON<BaseDatatable<Course>>(`${this.path}/course`, {
      data
    });
  }
  getStudentList(data: Pagination & { date: string; courses: string }): Observable<BaseDatatable<Student>> {
    return this.requestService.getJSON<BaseDatatable<Student>>(`${this.path}/student`, {
      data,
      is_loading: true
    });
  }
  checkMonthExisted(data: Omit<CheckMonthExisted, 'students'>): Observable<CheckMonthExisted> {
    return this.requestService.getJSON<CheckMonthExisted>(`${this.path}/check_exist`, {
      data,
      is_loading: true
    });
  }
  filterData(): Observable<unknown> {
    return this.requestService.getJSON(`${this.path}/filter_data`, {});
  }

  /**
   * @submit attendance
   */
  getManySubmit(data: Pagination): Observable<BaseDatatable<Attendance>> {
    return this.requestService.getJSON<BaseDatatable<Attendance>>(`${this.path}_submit`, {
      data,
      is_loading: true
    });
  }
  getSubmitDetail(
    data: Pagination & { students: string; attendance_submits: string }
  ): Observable<BaseDatatable<Attendance>> {
    return this.requestService.getJSON<BaseDatatable<Attendance>>(`${this.path}_submit/attendance_detail`, {
      data,
      is_loading: true
    });
  }
  getOneSubmit(_id: string): Observable<Attendance> {
    return this.requestService.getJSON<Attendance>(`${this.path}_submit/${_id}`, { is_loading: true });
  }
  submit(data: AttendanceStudentRecord): Observable<AttendanceStudentRecord> {
    return this.requestService.postJSON<AttendanceStudentRecord>(`${this.path}_submit`, { data });
  }
  updateSubmit(_id: string, data: AttendanceStudentRecord): Observable<AttendanceStudentRecord> {
    return this.requestService.patchJSON<AttendanceStudentRecord>(`${this.path}_submit/${_id}`, { data });
  }
  getStudentListSubmit(
    data: Pagination & { start_date: string; end_date: string }
  ): Observable<BaseDatatable<Student>> {
    return this.requestService.getJSON<BaseDatatable<Student>>(`${this.path}_submit/student`, {
      data,
      is_loading: true
    });
  }
  checkMonthExistedSubmit(data: Omit<CheckMonthExisted, 'students'>): Observable<CheckMonthExisted> {
    return this.requestService.getJSON<CheckMonthExisted>(`/admin/attendance_submit/check_exist`, {
      data,
      is_loading: true
    });
  }
  deleteSubmit(_id: string) {
    return this.requestService.deleteJSON<Attendance>(`${this.path}_submit/${_id}`);
  }
  filterDataSubmit(): Observable<unknown> {
    return this.requestService.getJSON(`${this.path}_submit/filter_data`, {});
  }

  filterStudentDataSubmit(data: { start_date: string; end_date: string }): Observable<unknown> {
    return this.requestService.getJSON(`${this.path}_submit/student/filter_data`, { data });
  }
}

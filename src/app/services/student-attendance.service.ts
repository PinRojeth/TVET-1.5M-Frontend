import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { AttendanceStudentRecord } from '../models/attendance';
import { BaseDatatable } from '../models/datatables/base.datatable';
import { CheckMonthExisted, ScholarshipPayment, Student } from '../models/student';
import { Pagination } from '../shares/pagination/pagination';
import { BaseCrudService } from './base-crud.service';

@Injectable({
  providedIn: 'root'
})
export class StudentAttendanceService extends BaseCrudService<AttendanceStudentRecord> {
  constructor(injector: Injector) {
    super(injector);
    this.path = '/admin/attendance_recod';
  }

  getOne(_id: string): Observable<AttendanceStudentRecord> {
    return this.requestService.getJSON(`${this.path}/${_id}`, { is_loading: true });
  }

  getAttendanceRecorded(
    data: Pagination & { year: number; month: number }
  ): Observable<BaseDatatable<AttendanceStudentRecord>> {
    return this.requestService.getJSON<BaseDatatable<AttendanceStudentRecord>>(`${this.path}`, {
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

  recordAttendance(data: AttendanceStudentRecord): Observable<AttendanceStudentRecord> {
    return this.requestService.postJSON<AttendanceStudentRecord>(`${this.path}`, { data });
  }

  editAttendance(_id: string, data: AttendanceStudentRecord): Observable<AttendanceStudentRecord> {
    return this.requestService.patchJSON<AttendanceStudentRecord>(`${this.path}/${_id}`, { data });
  }

  deleteAttendance(_id: string): Observable<AttendanceStudentRecord> {
    return this.requestService.deleteJSON<AttendanceStudentRecord>(`${this.path}/${_id}`, {});
  }

  getStudentList(data: Pagination): Observable<BaseDatatable<Student>> {
    return this.requestService.getJSON<BaseDatatable<Student>>(`${this.path}/student`, {
      data,
      is_loading: true
    });
  }

  filterData(): Observable<unknown> {
    return this.requestService.getJSON(`${this.path}/student/filter_data`, {});
  }

  //Scholarship Payment
  createPayment(_id: string, data: ScholarshipPayment): Observable<ScholarshipPayment> {
    return this.requestService.postJSON<ScholarshipPayment>(`/admin/scholarship_payments`, { data });
  }

  updatePayment(_id: string, data: ScholarshipPayment): Observable<ScholarshipPayment> {
    return this.requestService.patchJSON<ScholarshipPayment>(`/admin/scholarship_payments/${_id}`, { data });
  }

  deletePayment(_id: string): Observable<ScholarshipPayment> {
    return this.requestService.deleteJSON<ScholarshipPayment>(`/admin/scholarship_payments/${_id}`, {});
  }
}

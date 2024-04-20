import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../models/course';
import { BaseDatatable } from '../models/datatables/base.datatable';
import {
  ApplyStudent,
  ApprovedStudent,
  CheckMonthExisted,
  RequestTimeLine,
  Student,
  StudentAttendance,
  StudentRequestQuit,
  StudentRequests
} from '../models/student';
import { Pagination } from '../shares/pagination/pagination';
import { BaseCrudService } from './base-crud.service';
import { TypeEnum } from '../models/type_enum';

@Injectable({
  providedIn: 'root'
})
export class StudentService extends BaseCrudService<Student> {
  constructor(injector: Injector) {
    super(injector);
    this.path = '/admin/student';
  }

  getRequesting(data: Pagination): Observable<BaseDatatable<StudentRequests>> {
    return this.requestService.getJSON(this.path + '/request_list', { data, is_loading: true });
  }

  getRejected(data: Pagination): Observable<BaseDatatable<StudentRequests>> {
    return this.requestService.getJSON(this.path + '/rejected', { data, is_loading: true });
  }

  approval(data: any) {
    return this.requestService.postJSON(this.path + '/' + data.students + '/approval', { data });
  }

  applyRequest(data: any) {
    return this.requestService.postJSON(this.path + '/' + data.students + '/request', { data });
  }

  filterData(data: { status: number }): Observable<unknown> {
    return this.requestService.getJSON(this.path + '/filter_data', { data });
  }

  filterDataStudentRequest(): Observable<unknown> {
    return this.requestService.getJSON(this.path + '/request_list/filter_data');
  }

  filterDataStudent(): Observable<unknown> {
    return this.requestService.getJSON(this.path + '/approved_list/filter_data');
  }

  //approved functions
  getApprovedStudent(data: Pagination): Observable<BaseDatatable<ApprovedStudent>> {
    return this.requestService.getJSON<BaseDatatable<ApprovedStudent>>(this.path + '/approved_list', {
      data,
      is_loading: true
    });
  }
  updateApproveStudent(data: ApprovedStudent, _id: string): Observable<ApprovedStudent> {
    return this.requestService.patchFile(`${this.path}/${_id}`, { data });
  }
  requestQuit(data: StudentRequestQuit): Observable<StudentRequestQuit> {
    return this.requestService.postJSON<StudentRequestQuit>(this.path + '/quit', { data });
  }
  getOne(_id: string): Observable<ApprovedStudent> {
    return this.requestService.getJSON(`${this.path}/${_id}`, {});
  }
  getApprovedOne(_id: string, data: { query_poor_data: boolean }): Observable<ApprovedStudent> {
    return this.requestService.getJSON(`${this.path}/${_id}`, { data });
  }

  //student finish detail and timeline
  getFinishStudent(data: Pagination): Observable<BaseDatatable<ApprovedStudent>> {
    return this.requestService.getJSON<BaseDatatable<ApprovedStudent>>(this.path + '/quit', { data, is_loading: true });
  }
  getTimeLine(_id: string): Observable<BaseDatatable<RequestTimeLine>> {
    return this.requestService.getJSON<BaseDatatable<RequestTimeLine>>(`${this.path}/${_id}/timeline`, {});
  }
  getCourse(_id: string, data: any): Observable<BaseDatatable<Course>> {
    return this.requestService.getJSON<BaseDatatable<Course>>(`${this.path}/${_id}/change_course`, { data });
  }
  changeCourse(_id: string, data: { courses: string }): Observable<{courses: string}> {
    return this.requestService.postJSON<{courses: string}>(`${this.path}/${_id}/change_course`, { data });
  }

  //student attendance functions
  getAttendance(data: Pagination, _id: string): Observable<BaseDatatable<StudentAttendance>> {
    return this.requestService.getJSON<BaseDatatable<StudentAttendance>>(`${this.path}/${_id}/attendance`, {
      data,
      is_loading: true
    });
  }
  getAttendanceDetail(
    data: Pagination & { year: number; month: number },
    _id: string
  ): Observable<BaseDatatable<StudentAttendance>> {
    return this.requestService.getJSON<BaseDatatable<StudentAttendance>>(`${this.path}/${_id}/attendance_detail`, {
      data,
      is_loading: true
    });
  }
  checkMonthExisted(data: CheckMonthExisted): Observable<CheckMonthExisted> {
    return this.requestService.getJSON<CheckMonthExisted>(`${this.path}_attendance/check_exist`, {
      data,
      is_loading: true
    });
  }
  recordAttendance(data: StudentAttendance): Observable<StudentAttendance> {
    return this.requestService.postJSON<StudentAttendance>(`${this.path}_attendance`, { data });
  }
  editAttendance(data: StudentAttendance, _id: string): Observable<StudentAttendance> {
    return this.requestService.patchJSON<StudentAttendance>(`${this.path}_attendance/${_id}`, { data });
  }
  deleteAttendance(_id: string): Observable<StudentAttendance> {
    return this.requestService.deleteJSON<StudentAttendance>(`${this.path}_attendance/${_id}`, {});
  }

  // student poor id
  checkPoorData(data: { poor_id: string }): Observable<ApplyStudent> {
    return this.requestService.getJSON(this.path + '/check_poor_data', { data, is_loading: true });
  }

  applyStudy(data: any) {
    return this.requestService.postFile(this.path + '/apply_study', { data });
  }

  requestResume(data: { students: string }): Observable<StudentRequestQuit> {
    return this.requestService.postJSON<StudentRequestQuit>(this.path + '/resume', { data });
  }

  resetPassword(data: { students: string; new_password: string }): Observable<Student> {
    return this.requestService.postJSON(this.path + '/reset_password', { data });
  }

  addUser(data: { students: string; username: string; password: string }): Observable<Student> {
    return this.requestService.postJSON(this.path + '/add_user', { data });
  }

  addPoorId(data: { poor_id: string; poor_member_uuid: string }, id: string): Observable<Student> {
    return this.requestService.postJSON(this.path + '/' + id + '/add_poor_id', { data });
  }

  typeLeaveScholarship(): Observable<BaseDatatable<TypeEnum>> {
    return this.requestService.getJSON<BaseDatatable<TypeEnum>>(this.path + '/type_leave_scholarship');
  }
}

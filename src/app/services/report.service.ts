import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseDatatable as BaseDataTable } from '../models/datatables/base.datatable';
import { ApplyCountBySchool } from '../models/report';
import { StudentRequests } from '../models/student';
import { BaseCrudService } from './base-crud.service';

@Injectable({
  providedIn: 'root'
})
export class ReportService extends BaseCrudService<any> {
  constructor(injector: Injector) {
    super(injector);
    this.path = '/admin/report_data';
  }

  getApprovedBySchool(data: any): Observable<BaseDataTable<any>> {
    return this.requestService.getJSON(this.path + '/approved_by_school', { data });
  }

  getApprovedByMajor(data: any): Observable<BaseDataTable<any>> {
    return this.requestService.getJSON(this.path + '/approved_by_major', { data });
  }

  getAttendanceList(data: any): Observable<BaseDataTable<any>> {
    return this.requestService.getJSON(this.path + '/attendance_list', { data, is_loading: true });
  }

  getApprovedList(data: any): Observable<BaseDataTable<StudentRequests>> {
    return this.requestService.getJSON(this.path + '/approved_list', { data, is_loading: true });
  }

  getApplyCountBySChool(data: { start_date: string; end_date: string }): Observable<ApplyCountBySchool> {
    return this.requestService.getJSON(this.path + '/student_apply_count', { data, is_loading: true });
  }

  getApplyCountByMajor(data: { start_date: string; end_date: string }): Observable<ApplyCountBySchool> {
    return this.requestService.getJSON(this.path + '/student_apply_by_major', { data, is_loading: true });
  }

  getApplyStudentCityProvince(data: { start_date: string; end_date: string }): Observable<ApplyCountBySchool> {
    return this.requestService.getJSON(this.path + '/student_apply_city_province', { data, is_loading: true });
  }

  getApprovalStudentCount(data: { start_date: string; end_date: string }): Observable<ApplyCountBySchool> {
    return this.requestService.getJSON(this.path + '/approval_student_count', { data, is_loading: true });
  }

  getApprovalStudentCountByMajor(data: { start_date: string; end_date: string }): Observable<ApplyCountBySchool> {
    return this.requestService.getJSON(this.path + '/approval_student_by_major', { data, is_loading: true });
  }

  getApprovalStudentCityProvince(data: { start_date: string; end_date: string }): Observable<ApplyCountBySchool> {
    return this.requestService.getJSON(this.path + '/approval_student_city_province', { data, is_loading: true });
  }

  getStatusBySchool(data: { end_date: string }): Observable<ApplyCountBySchool> {
    //{ start_date: string; end_date: string }
    return this.requestService.getJSON(this.path + '/study_status_by_school', { data, is_loading: true });
  }

  getStatusByMajor(data: { end_date: string }): Observable<ApplyCountBySchool> {
    //{ start_date: string; end_date: string }
    return this.requestService.getJSON(this.path + '/study_status_by_major', { data, is_loading: true });
  }
  getWeeklyProgress(data: { end_date: string }): Observable<ApplyCountBySchool> {
    return this.requestService.getJSON(this.path + '/report_weekly_progress', { data, is_loading: true });
  }

  filterData(): Observable<unknown> {
    return this.requestService.getJSON(`${this.path}/filter_data`, {});
  }

  approvedStudentFilterData(): Observable<unknown> {
    return this.requestService.getJSON(`${this.path}/approved_list/filter_data`, {});
  }

  filterDataRequest(): Observable<unknown> {
    return this.requestService.getJSON(`${this.path}/study_status/filter_data`, {});
  }
}

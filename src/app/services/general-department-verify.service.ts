import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { BaseDatatable } from '../models/datatables/base.datatable';
import { RequestTimeLine, Student } from '../models/student';
import { BaseCrudService } from './base-crud.service';

@Injectable({
  providedIn: 'root'
})
export class GeneralDepartmentVerifyService extends BaseCrudService<Student> {
  constructor(injector: Injector) {
    super(injector);
    this.path = '/admin/approval_info_student';
  }

  filterData(): Observable<unknown> {
    return this.requestService.getJSON(this.path + '/filter_data', {});
  }

  getTimeLine(_id: string): Observable<BaseDatatable<RequestTimeLine>> {
    return this.requestService.getJSON<BaseDatatable<RequestTimeLine>>(`/admin/student/${_id}/timeline`, {});
  }

  verifyRequest(data: { status: number; reason?: string }, _id: string): Observable<{ status: number }> {
    return this.requestService.postJSON(`${this.path}/${_id}/approval`, { data });
  }

  reRequest(_id: string): Observable<unknown> {
    return this.requestService.postJSON(`${this.path}/${_id}/request`, {});
  }
}

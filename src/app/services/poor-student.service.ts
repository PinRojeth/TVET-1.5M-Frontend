import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseDatatable } from '../models/datatables/base.datatable';
import { Student, StudentRequests } from '../models/student';
import { BaseCrudService } from './base-crud.service';

@Injectable({
  providedIn: 'root'
})
export class PoorStudentService extends BaseCrudService<Student>{

  constructor(injector: Injector) {
    super(injector);
    this.path = '/admin/poor_student';
  }

  getPoorStudentById(id: string): Observable<BaseDatatable<StudentRequests>> {
    return this.requestService.getJSON(this.path +'/' + id, { });
  }

  approval(data: any) {
    return this.requestService.postJSON(this.path +'/' + data.students + '/approval', { data });
  }

  applyRequest(data: any) {
    return this.requestService.postJSON(this.path +'/' + data.students + '/request', { data });
  }

  filterData(data?: { status?: number }): Observable<unknown> {
    return this.requestService.getJSON(this.path + '/filter_data', { data });
  }
}

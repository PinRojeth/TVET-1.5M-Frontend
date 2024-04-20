import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { School } from '../models/school';
import { BaseCrudService } from './base-crud.service';
import { BaseDatatable } from '../models/datatables/base.datatable';

@Injectable({
  providedIn: 'root'
})
export class SchoolService extends BaseCrudService<School> {
  constructor(injector: Injector) {
    super(injector);
    this.path = '/admin/school';
  }

  createSchool(data: School): Observable<School> {
    return this.requestService.postFile(this.path, { data });
  }

  checkNameExist(data: { name: string; _id?: string }) {
    return this.requestService.getJSON(this.path + '/check_exist', { data });
  }

  filterData(): Observable<unknown> {
    return this.requestService.getJSON(this.path + '/filter_data', {});
  }

  getSchool(): Observable<BaseDatatable<School>> {
    return this.requestService.getJSON(this.path + '/active_course', { data: { limit: 0, page: 1 } })
  }
}

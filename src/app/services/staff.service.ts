import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseDatatable } from '../models/datatables/base.datatable';
import { Roles } from '../models/roles';
import { Staff } from '../models/staff';
import { BaseCrudService } from './base-crud.service';

@Injectable({
  providedIn: 'root'
})
export class StaffService extends BaseCrudService<Staff> {

  constructor(injector: Injector) {
    super(injector);
    this.path = '/admin/staff';
  }

  getAvailableRole(): Observable<BaseDatatable<Roles>> {
    return this.requestService.getJSON(this.path + '/available_role', {});
  }

  resetPassword(data: { staffs: string; new_password: string }): Observable<Staff> {
    return this.requestService.postJSON(this.path + '/reset_password', { data });
  }

  setStatus(data: { staffs: string; status: 1 | -2 }): Observable<Staff> {
    return this.requestService.postJSON(this.path + '/set_active', { data });
  }

  filterData(): Observable<unknown> {
    return this.requestService.getJSON(this.path + '/filter_data', {});
  }

}

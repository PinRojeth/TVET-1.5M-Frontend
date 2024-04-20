import { Injectable, Injector } from '@angular/core';
import { BaseCrudService } from './base-crud.service';
import { Shift } from '../models/shift';
import { Observable } from 'rxjs';
import { BaseDatatable } from '../models/datatables/base.datatable';

@Injectable({
  providedIn: 'root'
})
export class ShiftService extends BaseCrudService<Shift>{

  constructor(injector: Injector) {
    super(injector);
    this.path = '/admin/shift';
  }

  checkNameExist(data: { name: string, _id?: string }) {
    return this.requestService.getJSON(this.path + '/check_exist', { data });
  }

  // getShiftTime() {
  //   return this.requestService.getJSON(this.path + '/shift_time');
  // }

  getShiftTime(): Observable<BaseDatatable<Shift>> {
    return this.requestService.getJSON(this.path + '/shift_time');
  }
}

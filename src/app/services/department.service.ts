import { Injectable, Injector } from '@angular/core';
import { BaseCrudService } from './base-crud.service';
import { Department } from '../models/department';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService extends BaseCrudService<Department> {

  constructor(injector: Injector) {
    super(injector);
    this.path = '/admin/user_department';
  }

  checkNameExist(data: { name: string, _id?: string }) {
    return this.requestService.getJSON(this.path + '/check_exist', { data });
  }
}

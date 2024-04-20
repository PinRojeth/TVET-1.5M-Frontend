import { Injectable, Injector } from '@angular/core';
import { BaseCrudService } from './base-crud.service';
import { Major } from '../models/major';

@Injectable({
  providedIn: 'root'
})
export class MajorService extends BaseCrudService<Major> {

  constructor(injector: Injector) {
    super(injector);
    this.path = '/admin/apply_major';
  }

  checkNameExist(data: { name: string, _id?: string }) {
    return this.requestService.getJSON(this.path + '/check_exist', { data });
  }

}

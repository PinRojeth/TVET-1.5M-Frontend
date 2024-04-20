import { Injectable, Injector } from '@angular/core';
import { BaseCrudService } from './base-crud.service';
import { Sector } from '../models/sector';

@Injectable({
  providedIn: 'root'
})
export class SectorService extends BaseCrudService<Sector>{
  
  constructor(injector: Injector) {
    super(injector);
    this.path = '/admin/sector';
  }

  checkNameExist(data: { name: string, _id?: string }) {
    return this.requestService.getJSON(this.path + '/check_exist', { data });
  }
}

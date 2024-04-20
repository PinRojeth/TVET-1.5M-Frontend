import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { Address, CityProvince, Commune, District, Nationality, Village } from '../models/address';
import { BaseDatatable as BaseDataTable } from '../models/datatables/base.datatable';
import { BaseCrudService } from './base-crud.service';
import { TypeEnum } from '../models/type_enum';

@Injectable({
  providedIn: 'root'
})
export class TypeService extends BaseCrudService<Address> {
  constructor(injector: Injector) {
    super(injector);
    this.path = '/admin/type';
  }

  getScholarshipDocument(): Observable<BaseDataTable<TypeEnum>> {
    return this.requestService.getJSON<BaseDataTable<TypeEnum>>(this.path + '/scholarship_document');
  }
}

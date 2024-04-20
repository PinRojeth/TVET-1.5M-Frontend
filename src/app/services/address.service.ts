import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { Address, CityProvince, Commune, District, Nationality, Village } from '../models/address';
import { BaseDatatable as BaseDataTable } from '../models/datatables/base.datatable';
import { BaseCrudService } from './base-crud.service';

@Injectable({
  providedIn: 'root'
})
export class AddressService extends BaseCrudService<Address> {
  constructor(injector: Injector) {
    super(injector);
    this.path = '/admin/address';
  }

  getNationality(): Observable<BaseDataTable<Nationality>> {
    return this.requestService.getJSON<BaseDataTable<Nationality>>('/shared/address/nationality');
  }

  getCityProvince(): Observable<BaseDataTable<CityProvince>> {
    return this.requestService.getJSON<BaseDataTable<CityProvince>>('/shared/address/city_province');
  }

  getDistrict(_id: number): Observable<BaseDataTable<District>> {
    return this.requestService.getJSON<BaseDataTable<District>>('/shared/address/district?city_provinces=' + _id);
  }

  getCommune(_id: number): Observable<BaseDataTable<Commune>> {
    return this.requestService.getJSON<BaseDataTable<Commune>>('/shared/address/commune?districts=' + _id);
  }

  getVillage(_id: number): Observable<BaseDataTable<Village>> {
    return this.requestService.getJSON<BaseDataTable<Village>>('/shared/address/village?communes=' + _id);
  }
}

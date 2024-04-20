import { Injectable, Injector } from '@angular/core';
import { BaseCrudService } from './base-crud.service';
import { Cms } from '../models/cms';

@Injectable({
  providedIn: 'root'
})
export class CmsService extends BaseCrudService<Cms>{

  constructor(injector: Injector) {
    super(injector);
    this.path = '/admin/landing_page_cms';
  }

  getCms() {
    return this.requestService.getJSON<Cms>(this.path);
  }

  updateCms(data: Cms) {
    return this.requestService.patchJSON<Cms>(this.path, {data});
  }
}

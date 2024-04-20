import { Injectable, Injector } from '@angular/core';
import { BaseCrudService } from './base-crud.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService extends BaseCrudService<any> {
  constructor(injector: Injector) {
    super(injector);
    this.path = '/admin/dashbaord';
  }
}

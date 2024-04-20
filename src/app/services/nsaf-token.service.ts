import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { NSAFToken } from '../models/nsaf-token';
import { BaseCrudService } from './base-crud.service';

@Injectable({
  providedIn: 'root'
})
export class NsafTokenService extends BaseCrudService<NSAFToken> {
  constructor(injector: Injector) {
    super(injector);
    this.path = '/admin/system_config/token';
  }

  getOne(): Observable<NSAFToken> {
    return this.requestService.getJSON<NSAFToken>(this.path);
  }

  updateToken(data: { nsaf_token: string }): Observable<NSAFToken> {
    return this.requestService.patchJSON<NSAFToken>(this.path, { data });
  }
}

import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { BaseCrudService } from './base-crud.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseCrudService<User> {
  constructor(injector: Injector) {
    super(injector);
    this.path = '/admin/user';
  }
}

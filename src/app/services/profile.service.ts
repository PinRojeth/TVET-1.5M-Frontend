import { Injectable, Injector } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Staff } from '../models/staff';
import { User } from '../models/user';
import { AuthService } from './auth.service';
import { BaseCrudService } from './base-crud.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService extends BaseCrudService<Staff> {
  public staffId: string | undefined;

  constructor(injector: Injector, private authService: AuthService) {
    super(injector);
    this.path = 'admin/account';
  }

  getAccountInfo(): Observable<Staff> {
    return this.requestService.getJSON(this.path + '/info');
  }

  changePassword(data: { old_password: string; new_password: string }) {
    return this.requestService.postJSON(this.path + '/change_password', { data });
  }

  updateMyInfo(data: User) {
    return this.requestService.patchFile<Staff>(this.path + '/info', { data }).pipe(
      map(res => {
        this.authService.authChange$.next(true);
        return res;
      })
    );
  }

  checkUsername(data: { username: string[] }) {
    return this.requestService.getJSON<string[]>(this.path + '/check_existed_user', {
      data
    });
  }

  checkExistedUser(data: { username: string }) {
    return this.requestService.getJSON(this.path + '/check_existed_user', { data });
  }
  
}

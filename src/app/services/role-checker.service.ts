import { Injectable } from '@angular/core';
import { Role } from '../models/enums/enumConstant';
import { LocalStorageEnum } from '../models/enums/local-storage.enum';
import { AuthService } from './auth.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class RoleCheckerService {
  public m_roles: number | undefined;
  public roles = Role;

  private permissions: string[] | undefined;

  constructor(private localStorageService: LocalStorageService, private authService: AuthService) {
    this.authService.authChange$.subscribe(isAuth => {
      if (isAuth) {
        this.permissions = this.localStorageService.getArray(LocalStorageEnum.permissions);
      }
    });
  }

  SetPermissions(permissions: string[]) {
    this.permissions = [];
    this.permissions = permissions;
  }

  GetPermissions(): string[] {
    if (this.permissions == undefined || this.permissions.length <= 0) {
      this.permissions = this.localStorageService.getArray(LocalStorageEnum.permissions);
    }
    return this.permissions;
  }
}

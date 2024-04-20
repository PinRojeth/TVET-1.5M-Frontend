import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ArrayRolePipe } from './pipes/array-role.pipe';
import { PermissionPipe } from './pipes/permission.pipe';
import { RoleCheckPipe } from './pipes/role-check.pipe';
import { RolePipe } from './pipes/role.pipe';
import { StaffRolePipe } from './pipes/staff-role.pipe';

@NgModule({
  declarations: [StaffRolePipe, RoleCheckPipe, PermissionPipe, RolePipe, ArrayRolePipe],
  imports: [CommonModule],
  exports: [StaffRolePipe, RoleCheckPipe, PermissionPipe, RolePipe, ArrayRolePipe]
})
export class RoleModule {}

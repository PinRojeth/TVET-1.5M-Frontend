import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountSettingEditingComponent } from './components/account-setting-editing/account-setting-editing.component';
import { AccountSettingComponent } from './components/account-setting/account-setting.component';
import { CmsEditComponent } from './components/cms-edit/cms-edit.component';
import { CmsComponent } from './components/cms/cms.component';
import { CreateShiftComponent } from './components/create-shift/create-shift.component';
import { ShiftInfoComponent } from './components/shift-info/shift-info.component';
import { ShiftComponent } from './components/shift/shift.component';
import { TokenEditComponent } from './components/token-edit/token-edit.component';
import { TokenComponent } from './components/token/token.component';
import { DepartmentComponent } from './components/department/department.component';
import { CreateDepartmentComponent } from './components/create-department/create-department.component';
import { DepartmentInfoComponent } from './components/department-info/department-info.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'account',
        component: AccountSettingComponent
      },
      {
        path: 'account/edit/:id',
        component: AccountSettingEditingComponent
      },
      {
        path: 'cms',
        component: CmsComponent
      },
      {
        path: 'cms/edit/:id',
        component: CmsEditComponent
      },
      {
        path: 'shift',
        children: [
          {
            path: '',
            component: ShiftComponent
          },
          {
            path: 'create',
            component: CreateShiftComponent
          },
          {
            path: 'edit/:id',
            component: CreateShiftComponent
          },
          {
            path: 'info/:id',
            component: ShiftInfoComponent
          }
        ]
      },
      {
        path: 'department',
        children: [
          {
            path: '',
            component: DepartmentComponent
          },
          {
            path: 'create',
            component: CreateDepartmentComponent
          },
          {
            path: 'edit/:id',
            component: CreateDepartmentComponent
          },
          {
            path: 'info/:id',
            component: DepartmentInfoComponent
          }
        ]
      },
      {
        path: 'system-config',
        children: [
          {
            path: '',
            component: TokenComponent
          },
          {
            path: ':tokenId',
            component: TokenEditComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule {}

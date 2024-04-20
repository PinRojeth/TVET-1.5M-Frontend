import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeneralDepartmentVerifyTabComponent } from './components/general-department-verify-tab/general-department-verify-tab.component';
import { GeneralDepartmentVerifyComponent } from './components/general-department-verify/general-department-verify.component';
import { StudentVerifyTabComponent } from './components/student-verify-tab/student-verify-tab.component';
import { StudentVerifyComponent } from './components/student-verify/student-verify.component';

const routes: Routes = [
  {
    path: 'verify',
    children: [
      {
        path: '',
        component: StudentVerifyComponent
      },
      {
        path: 'info/:studentId',
        children: [
          {
            path: '',
            redirectTo: 'info',
            pathMatch: 'full'
          },
          {
            path: ':tab',
            component: StudentVerifyTabComponent
          }
        ]
      }
    ]
  },
  {
    path: 'approval',
    children: [
      {
        path: '',
        component: GeneralDepartmentVerifyComponent
      },
      {
        path: 'info/:studentId',
        children: [
          {
            path: '',
            redirectTo: 'info',
            pathMatch: 'full'
          },
          {
            path: ':tab',
            component: GeneralDepartmentVerifyTabComponent
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
export class StudentVerifyRoutingModule {}

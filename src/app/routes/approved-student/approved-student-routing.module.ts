import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentApprovedEditingComponent } from './components/student-approved-editing/student-approved-editing.component';
import { StudentApprovedComponent } from './components/student-approved/student-approved.component';
import { StudentFinishAttendanceComponent } from './components/student-finish-attendance/student-finish-attendance.component';
import { StudentFinishTabComponent } from './components/student-finish-tab/student-finish-tab.component';
import { StudentFinishComponent } from './components/student-finish/student-finish.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'approved',
        children: [
          {
            path: '',
            component: StudentApprovedComponent
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
                component: StudentFinishTabComponent
              }
            ]
          },
          {
            path: 'edit/:studentId',
            component: StudentApprovedEditingComponent
          },
          {
            path: 'attendance/:studentId/:name',
            component: StudentFinishAttendanceComponent
          }
        ]
      },
      {
        path: 'finished',
        children: [
          {
            path: '',
            component: StudentFinishComponent
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
                component: StudentFinishTabComponent
              }
            ]
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
export class ApprovedStudentRoutingModule {}

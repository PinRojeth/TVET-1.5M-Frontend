import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AttendanceRecordCrudComponent } from './components/attendance-record-crud/attendance-record-crud.component';
import { AttendanceRecordInfoComponent } from './components/attendance-record-info/attendance-record-info.component';
import { AttendanceRecordComponent } from './components/attendance-record/attendance-record.component';
import { AttendanceSubmitCrudComponent } from './components/attendance-submit-crud/attendance-submit-crud.component';
import { AttendanceSubmitInfoComponent } from './components/attendance-submit-info/attendance-submit-info.component';
import { AttendanceSubmitComponent } from './components/attendance-submit/attendance-submit.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'record-list',
        children: [
          {
            path: '',
            component: AttendanceRecordComponent
          },
          {
            path: 'implement',
            component: AttendanceRecordCrudComponent
          },
          {
            path: 'implement/:course',
            component: AttendanceRecordCrudComponent
          },
          {
            path: 'implement/:course/:date',
            component: AttendanceRecordCrudComponent
          },
          {
            path: 'info/:attendance',
            component: AttendanceRecordInfoComponent
          }
        ]
      },
      {
        path: 'submit',
        children: [
          {
            path: '',
            component: AttendanceSubmitComponent
          },
          {
            path: 'implement',
            component: AttendanceSubmitCrudComponent
          },
          {
            path: 'info/:attendance',
            component: AttendanceSubmitInfoComponent
          },
          {
            path: 'edit/:attendance',
            component: AttendanceSubmitCrudComponent
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
export class AttendanceRoutingModule {}

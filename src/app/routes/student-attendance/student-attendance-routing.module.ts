import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentAttendanceCrudComponent } from './components/student-attendance-crud/student-attendance-crud.component';
import { StudentAttendanceInfoComponent } from './components/student-attendance-info/student-attendance-info.component';
import { StudentAttendanceComponent } from './components/student-attendance/student-attendance.component';

const routes: Routes = [
  {
    path: '',
    data: { title: 'menu.student-attendance' },
    children: [
      {
        path: '',
        component: StudentAttendanceComponent
      },
      {
        path: 'create',
        component: StudentAttendanceCrudComponent
      },
      {
        path: 'edit/:attendanceId',
        component: StudentAttendanceCrudComponent
      },
      {
        path: 'info/:attendanceId',
        component: StudentAttendanceInfoComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentAttendanceRoutingModule {}

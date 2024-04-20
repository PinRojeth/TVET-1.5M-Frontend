import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContainerComponent } from './components/container/container.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'major',
    pathMatch: 'full'
  },
  {
    path: '',
    component: ContainerComponent,
    children: [
      // {
      //   path: 'home',
      //   canActivate: [AuthGuard],
      //   loadChildren: async () => (await import('./routes/home/home.module')).HomeModule
      // },
      {
        path: 'sector',
        canActivate: [AuthGuard],
        loadChildren: async () => (await import('./routes/sector/sector.module')).SectorModule
      },
      {
        path: 'major',
        canActivate: [AuthGuard],
        loadChildren: async () => (await import('./routes/major/major.module')).MajorModule
      },
      {
        path: 'school',
        canActivate: [AuthGuard],
        loadChildren: async () => (await import('./routes/school/school.module')).SchoolModule
      },
      {
        path: 'human-resource',
        canActivate: [AuthGuard],
        loadChildren: async () => (await import('./routes/human-resource/human-resource.module')).HumanResourceModule
      },
      {
        path: 'student-requests',
        canActivate: [AuthGuard],
        loadChildren: async () =>
          (await import('./routes/student-requests/student-requests.module')).StudentRequestsModule
      },
      {
        path: 'approved-student',
        canActivate: [AuthGuard],
        loadChildren: async () =>
          (await import('./routes/approved-student/approved-student.module')).ApprovedStudentModule
      },
      {
        path: 'student-info-checking',
        canActivate: [AuthGuard],
        loadChildren: async () => (await import('./routes/student-verify/student-verify.module')).StudentVerifyModule
      },
      {
        path: 'report',
        canActivate: [AuthGuard],
        loadChildren: async () => (await import('./routes/report/report.module')).ReportModule
      },
      {
        path: 'poor-student',
        canActivate: [AuthGuard],
        loadChildren: async () => (await import('./routes/id-poor-request/id-poor-request.module')).IdPoorRequestModule
      },
      {
        path: 'course',
        canActivate: [AuthGuard],
        loadChildren: async () => (await import('./routes/courses/courses.module')).CoursesModule
      },
      {
        path: 'setting',
        canActivate: [AuthGuard],
        loadChildren: () => import('./routes/setting/setting.module').then(m => m.SettingModule)
      },
      {
        path: 'student-attendance',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./routes/student-attendance/student-attendance.module').then(m => m.StudentAttendanceModule)
      },
      {
        path: 'attendance',
        canActivate: [AuthGuard],
        loadChildren: async () => (await import('./routes/attendance/attendance.module')).AttendanceModule
      }
    ]
  },
  {
    path: 'login',
    loadChildren: () => import('./routes/login/login.module').then(m => m.LoginModule)
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], //{ relativeLinkResolution: 'legacy' }
  exports: [RouterModule]
})
export class AppRoutingModule {}

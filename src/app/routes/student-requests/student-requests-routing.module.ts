import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PendingListComponent } from './components/pending-list/pending-list.component';
import { RejectedListComponent } from './components/rejected-list/rejected-list.component';
import { PendingInfoComponent } from './components/pending-info/pending-info.component';
import { RejectedInfoComponent } from './components/rejected-info/rejected-info.component';
import { PendingOperationComponent } from './components/pending-operation/pending-operation.component';
import { CreatePendingComponent } from './components/create-pending/create-pending.component';
import { StudentRequestEditingComponent } from './components/student-request-editing/student-request-editing.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'student-requests',
    pathMatch: 'full'
  },
  {
    path: 'student-requests',
    children: [
      {
        path: '',
        component: PendingListComponent
      },
      {
        path: 'create',
        component: PendingOperationComponent
      },
      {
        path: 'create-with-poor-id',
        component: CreatePendingComponent
      },
      {
        path: 'info/:studentRequestId',
        component: PendingInfoComponent
      },
      {
        path: 'edit/:studentRequestId',
        component: StudentRequestEditingComponent
      },
    ]
  },
  {
    path: 'rejected',
    children: [
      {
        path: '',
        component: RejectedListComponent
      },
      {
        path: 'info/:studentRequestId',
        component: RejectedInfoComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRequestsRoutingModule { }

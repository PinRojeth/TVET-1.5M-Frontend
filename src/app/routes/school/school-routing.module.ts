import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SchoolListComponent } from './components/school-list/school-list.component';
import { SchoolOperationComponent } from './components/school-operation/school-operation.component';
import { SchoolInfoComponent } from './components/school-info/school-info.component';

const routes: Routes = [
  {
    path: '',
    component: SchoolListComponent
  },
  {
    path: 'create',
    component: SchoolOperationComponent
  },
  {
    path: 'edit/:schoolId',
    component: SchoolOperationComponent
  },
  {
    path: 'info/:schoolId',
    component: SchoolInfoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchoolRoutingModule { }

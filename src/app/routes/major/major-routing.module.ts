import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MajorListComponent } from './components/major-list/major-list.component';
import { MajorOperationComponent } from './components/major-operation/major-operation.component';
import { MajorInfoComponent } from './components/major-info/major-info.component';

const routes: Routes = [
  {
    path: '',
    component: MajorListComponent
  },
  {
    path: 'create',
    component: MajorOperationComponent
  },
  {
    path: 'info/:majorId',
    component: MajorInfoComponent
  },
  {
    path: 'edit/:majorId',
    component: MajorOperationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MajorRoutingModule { }

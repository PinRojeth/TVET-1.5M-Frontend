import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HumanResourceListComponent } from './components/human-resource-list/human-resource-list.component';
import { HumanResourceOperationComponent } from './components/human-resource-operation/human-resource-operation.component';
import { HumanResourceInfoComponent } from './components/human-resource-info/human-resource-info.component';

const routes: Routes = [
  {
    path: '',
    component: HumanResourceListComponent
  },
  {
    path: 'create',
    component: HumanResourceOperationComponent
  },
  {
    path: 'edit/:staffId',
    component: HumanResourceOperationComponent
  },
  {
    path: 'info/:staffId',
    component: HumanResourceInfoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HumanResourceRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IdPoorRquestComponent } from './components/id-poor-rquest/id-poor-rquest.component';
import { IdPoorRquestInfoComponent } from './components/id-poor-rquest-info/id-poor-rquest-info.component';

const routes: Routes = [
  {
    path: '',
    component: IdPoorRquestComponent
  },
  {
    path: 'info/:poorStudentId',
    component: IdPoorRquestInfoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IdPoorRequestRoutingModule { }

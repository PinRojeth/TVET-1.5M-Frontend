import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SectorComponent } from './components/sector/sector.component';
import { CreateSectorComponent } from './components/create-sector/create-sector.component';
import { SectorInfoComponent } from './components/sector-info/sector-info.component';

const routes: Routes = [
  {
    path: '',
    component: SectorComponent
  },
  {
    path: 'create',
    component: CreateSectorComponent
  },
  {
    path: 'info/:sectorId',
    component: SectorInfoComponent
  },
  {
    path: 'edit/:sectorId',
    component: CreateSectorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SectorRoutingModule { }

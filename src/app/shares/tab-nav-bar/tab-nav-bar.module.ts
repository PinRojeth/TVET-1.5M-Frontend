import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TabNavBarRoutingModule } from './tab-nav-bar-routing.module';
import { TabNavBarComponent } from './tab-nav-bar.component';
import { MatTabsModule } from '@angular/material/tabs';
import { RoleModule } from '../role/role.module';
import { TranslateModule } from '@ngx-translate/core';
import { PermissionPipe } from '../role/pipes/permission.pipe';


@NgModule({
  declarations: [
    TabNavBarComponent
  ],
  imports: [
    CommonModule,
    TabNavBarRoutingModule,
    MatTabsModule,
    RoleModule,
    TranslateModule
  ],
  providers: [PermissionPipe],
  exports: [TabNavBarComponent]
})
export class TabNavBarModule { }

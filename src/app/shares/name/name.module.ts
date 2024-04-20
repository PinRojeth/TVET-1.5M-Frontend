import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CheckNameExistedDirective } from './check-name-existed.directive';
import { FullAddressPipe } from './pipes/full-address.pipe';
import { FullNamePipe } from './pipes/full-name.pipe';
import { StaffFullNamePipe } from './pipes/staff-full-name.pipe';

@NgModule({
  declarations: [FullNamePipe, FullAddressPipe, StaffFullNamePipe, CheckNameExistedDirective],
  imports: [CommonModule],
  exports: [FullNamePipe, FullAddressPipe, StaffFullNamePipe, CheckNameExistedDirective]
})
export class NameModule {}

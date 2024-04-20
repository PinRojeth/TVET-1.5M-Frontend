import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule } from '@ngx-translate/core';
import { ApiSearchbarComponent } from './components/api-searchbar/api-searchbar.component';
import { FrontEndSearchbarComponent } from './components/front-end-searchbar/front-end-searchbar.component';
import { SearchbarInSelectOptionComponent } from './components/searchbar-in-select-option/searchbar-in-select-option.component';

@NgModule({
  declarations: [SearchbarInSelectOptionComponent, FrontEndSearchbarComponent, ApiSearchbarComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    TranslateModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  exports: [SearchbarInSelectOptionComponent, FrontEndSearchbarComponent, ApiSearchbarComponent]
})
export class SearchbarInSelectOptionModule {}

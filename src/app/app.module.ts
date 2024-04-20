import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DATE_LOCALE, MatRippleModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { QuillModule } from 'ngx-quill';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { ContainerComponent } from './components/container/container.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthInterceptor } from './intercptors/auth.interceptor';
import { ConfirmDialogModule } from './shares/confirm-dialog/confirm-dialog.module';
import { EmptyModule } from './shares/empty/empty.module';
import { NameModule } from './shares/name/name.module';
import { RoleModule } from './shares/role/role.module';
import { SnackbarModule } from './shares/snackbar/snackbar.module';
import { StaticFileModule } from './shares/static-file/static-file.module';

// Required for AOT compilation
export function TranslateHttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent, NotFoundComponent, ContainerComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatButtonModule,
    MatListModule,
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    RouterModule,
    MatExpansionModule,
    NameModule,
    StaticFileModule,
    SnackbarModule,
    ConfirmDialogModule,
    MatTooltipModule,
    RoleModule,
    EmptyModule,
    MatRippleModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: TranslateHttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    QuillModule.forRoot({
      modules: {
        toolbar: [['bold', 'italic'], [{ align: [] }], ['link', 'image']]
      },
      placeholder: '*'
    })
  ],

  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    /**
     * Is used for refresh token
     */
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

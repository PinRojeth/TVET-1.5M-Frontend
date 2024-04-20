import { HttpClient, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, from, lastValueFrom, throwError } from 'rxjs';
import { catchError, first, map, mergeMap, share } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { APIResponseCodeEnum } from '../models/enums/api-response-code.enum';
import { LocalStorageEnum } from '../models/enums/local-storage.enum';
import { RefreshTokenResponse } from '../models/responses/refresh-token.response';
import { AuthService } from '../services/auth.service';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private localStorageService: LocalStorageService,
    private authService: AuthService,
    private http: HttpClient
  ) {}
  tokenBehaviorSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    const refresh_token_url = environment.api_url + '/admin/account/renew_token';
    const refresh_token = this.localStorageService.get(LocalStorageEnum.refresh_token);
    let token = this.localStorageService.get(LocalStorageEnum.token);

    if (req.url == refresh_token_url) {
      req = this.addToken(req, refresh_token);
    } else if (token) {
      req = this.addToken(req, token);
    }

    return next.handle(req).pipe(
      catchError(err => {
        if (err.status === APIResponseCodeEnum.unauthorized) {
          if (refresh_token) {
            return from(this.refreshToken(refresh_token_url, this.http)).pipe(
              mergeMap((token: any) => {
                this.localStorageService.set(LocalStorageEnum.token, token);
                return next.handle(this.addToken(req, token));
              }),
              catchError(err => {
                // If we don't get a new token, we are in trouble so logout.
                this.logout();
                return throwError(() => err);
              })
            );
          } else {
            this.logout();
          }
        } else if (err.status === APIResponseCodeEnum.refresh_token_error) {
          this.logout();
          return throwError(() => err);
        }
        return throwError(() => err);
      })
    );
  }

  private addToken(req: HttpRequest<any>, token: string) {
    return req.clone({
      setHeaders: {
        Authorization: 'Bearer ' + token
      }
    });
  }

  private logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

  httpRequest: Observable<string>;
  private async refreshToken(refresh_url: string, http: HttpClient): Promise<string> {
    if (!this.httpRequest) {
      this.httpRequest = http
        .post<RefreshTokenResponse>(refresh_url, {})
        .pipe(map(res => res.data.token))
        .pipe(first())
        .pipe(share());
    }
    const res = await lastValueFrom(this.httpRequest);
    this.localStorageService.set(LocalStorageEnum.token, res);
    return res;
  }
}

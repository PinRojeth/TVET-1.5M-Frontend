import { HttpClient, HttpErrorResponse, HttpEventType, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceDetectorService, DeviceInfo } from 'ngx-device-detector';
import { Observable, throwError } from 'rxjs';
import { catchError, filter, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { APIResponseCodeEnum } from '../models/enums/api-response-code.enum';
import { LocalStorageEnum } from '../models/enums/local-storage.enum';
import { RequestParam } from '../models/request-param';
import { BaseResponse } from '../models/responses/base.response';
import { LoadingService } from './loading.service';
import { LocalStorageService } from './local-storage.service';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  deviceInfo: DeviceInfo;
  constructor(
    private http: HttpClient,
    private loadingService: LoadingService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private snackbarService: SnackbarService,
    private deviceService: DeviceDetectorService
  ) {
    this.deviceInfo = this.deviceService.getDeviceInfo();
  }

  get<T>(path: string, request: RequestParam = {}) {
    const url = this.getUrl(path);
    this.clean(request.data);
    if (request.is_loading) {
      this.loadingService.setLoading(url, true);
    }
    const headers = this.getAuthHeader();
    return this.http.get<T>(url, { params: request.data, headers }).pipe(
      map(res => {
        if (request.is_loading) {
          this.loadingService.setLoading(url, false);
        }
        return res;
      }),
      catchError(err => this.createHandlerErrorObject(url, request, err))
    );
  }

  getJSON<T>(path: string, request: RequestParam = {}) {
    const url = this.getUrl(path);
    this.clean(request.data);

    if (request.is_loading) {
      this.loadingService.setLoading(url, true);
    }

    const headers = this.getAuthHeader();
    headers.append('Content-Type', 'application/json');
    return this.http.get<BaseResponse>(url, { params: request.data, headers }).pipe(
      map(res => this.handleResponse<T>(url, res, request.is_loading)),
      catchError(err => this.createHandlerErrorObject(url, request, err))
    );
  }

  post<T>(path: string, request: RequestParam) {
    const url = this.getUrl(path);
    this.clean(request.data);
    let withDeviceInfoParams = { ...request.data, device_name: this.deviceInfo.device, device_os: this.deviceInfo.os };
    if (request.is_loading) {
      this.loadingService.setLoading(url, true);
    }
    const headers = this.getAuthHeader();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    request.data = this.toFormData(request.data);
    return this.http.post<BaseResponse>(url, withDeviceInfoParams, { headers }).pipe(
      map(res => this.handleResponse<T>(url, res, request.is_loading)),
      catchError(err => this.createHandlerErrorObject(url, request, err))
    );
  }

  postJSON<T>(path: string, request: RequestParam) {
    const url = this.getUrl(path);
    this.clean(request.data);
    if (request.is_loading) {
      this.loadingService.setLoading(url, true);
    }
    const headers = this.getAuthHeader();
    headers.append('Content-Type', 'application/json');
    return this.http.post<BaseResponse>(url, request.data, { headers }).pipe(
      map(res => this.handleResponse<T>(url, res, request.is_loading)),
      catchError(err => this.createHandlerErrorObject(url, request, err))
    );
  }

  postFile<T>(path: string, request: RequestParam): Observable<T> {
    const url = this.getUrl(path);
    this.clean(request.data);
    // if (request.is_loading) {
    //   this.loadingService.setLoading(url, true);
    // }

    //loading: default - true
    request.is_loading = request.is_loading !== false ? true : false;
    if (request.is_loading) {
      this.loadingService.url = url;
      this.loadingService.setLoading(url, true);
    }

    const headers = this.getAuthHeader();
    headers.append('Content-Type', 'multipart/form-data;boundary=abc');
    request.data = this.toFormData(request.data);
    return this.http.post<BaseResponse>(url, request.data, { headers }).pipe(
      map(res => this.handleResponse<T>(url, res, request.is_loading)),
      catchError(err => this.createHandlerErrorObject(url, request, err))
    );
  }

  patchFile<T>(path: string, request: RequestParam): Observable<T> {
    const url = this.getUrl(path);
    this.clean(request.data);
    let withDeviceInfoParams = { ...request.data, device_name: this.deviceInfo.device, device_os: this.deviceInfo.os };
    // if (request?.is_loading) {
    //   this.loadingService.setLoading(url, true);
    // }

    //loading: default - true
    request.is_loading = request.is_loading !== false ? true : false;
    if (request.is_loading) {
      this.loadingService.url = url;
      this.loadingService.setLoading(url, true);
    }

    const headers = this.getAuthHeader();
    headers.append('Content-Type', 'multipart/form-data;boundary=abc');
    withDeviceInfoParams = this.toFormData(withDeviceInfoParams);
    return this.http.patch<BaseResponse>(url, withDeviceInfoParams, { headers }).pipe(
      map(res => this.handleResponse<T>(url, res, request.is_loading)),
      catchError(err => this.createHandlerErrorObject(url, request, err))
    );
  }

  postFileProgress<T>(path: string, request: RequestParam): Observable<number | T> {
    const url = this.getUrl(path);
    this.clean(request.data);
    // if (request.is_loading) {
    //   this.loadingService.setLoading(true);
    // }

    request.is_loading = request.is_loading !== false ? true : false;
    if (request.is_loading) {
      this.loadingService.url = url;
      this.loadingService.setLoading(url, true);
    }

    const headers = this.getAuthHeader();
    headers.append('Content-Type', 'multipart/form-data;boundary=abc');
    request.data = this.toFormData(request.data);
    return this.http.post<BaseResponse>(url, request.data, { headers, reportProgress: true, responseType: 'json', observe: "events" }).pipe(
      filter(res => res.type == HttpEventType.UploadProgress || res.type == HttpEventType.Response),
      map(res => {
        if (res.type == HttpEventType.UploadProgress) {
          return Math.round(res.loaded / (res.total || 0) * 100);
        } else {
          return this.handleResponse<T>(
            url,
            (res as HttpResponse<BaseResponse<T>>).body || ({} as BaseResponse<T>),
            request.is_loading
          );
        }
      }),
      catchError(err => this.createHandlerErrorObject(url, request, err))
    );
  }

  patchFileProgress<T>(path: string, request: RequestParam): Observable<number | T> {

    const url = this.getUrl(path);
    this.clean(request.data);

    request.is_loading = request.is_loading !== false ? true : false;
    if (request.is_loading) {
      this.loadingService.url = url;
      this.loadingService.setLoading(url, true);
    }
    const headers = this.getAuthHeader();
    headers.append('Content-Type', 'multipart/form-data;boundary=abc');
    request.data = this.toFormData(request.data);
    return this.http.patch<BaseResponse>(url, request.data, { headers, reportProgress: true, responseType: 'json', observe: "events" }).pipe(
      filter(res => res.type == HttpEventType.UploadProgress || res.type == HttpEventType.Response),
      map(res => {
        if (res.type == HttpEventType.UploadProgress) {
          return Math.round(res.loaded / (res.total || 0) * 100);
        } else {
          return this.handleResponse<T>(
            url,
            (res as HttpResponse<BaseResponse<T>>).body || ({} as BaseResponse<T>),
            request.is_loading
          );
        }
      }),
      catchError(err => this.createHandlerErrorObject(url, request, err))
    );
  }

  patchJSON<T>(path: string, request: RequestParam) {
    const url = this.getUrl(path);
    this.clean(request.data);
    const withDeviceInfoParams = {
      ...request.data,
      device_name: this.deviceInfo.device,
      device_os: this.deviceInfo.os
    };
    if (request.is_loading) {
      this.loadingService.setLoading(url, true);
    }
    const headers = this.getAuthHeader();
    headers.append('Content-Type', 'application/json');
    return this.http.patch<BaseResponse>(url, withDeviceInfoParams, { headers }).pipe(
      map(res => this.handleResponse<T>(url, res, request.is_loading)),
      catchError(err => this.createHandlerErrorObject(url, request, err))
    );
  }

  deleteJSON<T>(path: string, request: RequestParam = {}) {
    const withDeviceInfoParams = {
      ...request.data,
      device_name: this.deviceInfo.device,
      device_os: this.deviceInfo.os
    };
    const url = this.getUrl(path);
    if (request.is_loading) {
      this.loadingService.setLoading(url, true);
    }
    const headers = this.getAuthHeader();
    headers.append('Content-Type', 'application/json');
    return this.http.delete<BaseResponse>(url, { headers, params: withDeviceInfoParams }).pipe(
      map(res => this.handleResponse<T>(url, res, request.is_loading)),
      catchError(err => this.createHandlerErrorObject(url, request, err))
    );
  }

  private clean(obj: any) {
    for (const propName in obj) {
      if (obj[propName] === null || obj[propName] === undefined) {
        delete obj[propName];
      }
    }
  }

  private getAuthHeader(): HttpHeaders {
    const token = this.localStorageService.get(LocalStorageEnum.token);
    if (token) {
      return new HttpHeaders({
        Authorization: 'Bearer ' + token
      });
    }
    return new HttpHeaders();
  }

  private handleResponse<T>(url: string, res: BaseResponse<T>, is_loading?: boolean) {
    if (is_loading) {
      this.loadingService.setLoading(url, false);
    }
    return res.data;
  }

  private handleHttpError(param: {
    url: string;
    error: HttpErrorResponse;
    is_loading?: boolean;
    disable_alert?: boolean;
    custom_message?: string;
  }) {
    if (param.is_loading) {
      this.loadingService.setLoading(param.url, false);
    }
    if (param.error.status === APIResponseCodeEnum.server_error) {
      this.snackbarService.onShowSnackbar({
        message: param.error.error.message,
        isError: true
      });
    } else {
      if (!param.disable_alert) {
          let errMessage: string;
          if (param.error.error.errors) {
            if (param.error.error.errors.length > 0) {
              errMessage = param.error.error.errors[0].msg;
            }
          }
        this.snackbarService.onShowSnackbar({
          message:
            param.custom_message != null ? param.custom_message : param?.error?.error?.message ?? errMessage ?? param?.error?.message,
          isError: true
        });
      }
    }
    return throwError(() => param?.error?.error?.message ?? param?.error?.message);
  }

  private toFormData(formValue: any) {
    const formData = new FormData();

    for (const key of Object.keys(formValue)) {
      const value = formValue[key];
      formData.append(key, value);
    }
    return formData;
  }

  private getUrl(path: string) {
    let arr = path.split('/').filter(v => v);
    arr.unshift(environment.api_url);
    return arr.join('/');
  }

  private createHandlerErrorObject(url: string, request: RequestParam, err: any) {
    return this.handleHttpError({
      url: url,
      error: err,
      is_loading: request.is_loading,
      disable_alert: request.disable_alert,
      custom_message: request.custom_error_message
    });
  }
}

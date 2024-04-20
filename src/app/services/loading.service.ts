import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private _isLoading = false;
  private _isLoading$ = new BehaviorSubject(new Map<string, boolean>());
  private loadingMap: Map<string, boolean> = new Map<string, boolean>();
  isLoading$: Observable<Map<string, boolean>> = this._isLoading$;
  counter = 0;
  url: string = null;

  constructor() {
    this.isLoading$ = this._isLoading$.asObservable().pipe(delay(300));
  }

  setLoading(url: string, isLoading: boolean) {
    if (isLoading) {
      this.counter++;
      this.loadingMap.set(url, isLoading)
    } else {
      this.counter = this.counter - 1 < 0 ? 0 : this.counter - 1;
      if (url) {
        this.loadingMap.delete(url)
      }
    }
    if (this.loadingMap.size === 0) {
      this.counter = 0
    }
    this._isLoading = this.counter > 0;
    this._isLoading$.next(this.loadingMap);
  }

  forceStop() {
    this.counter = 0;
    this._isLoading = false;
    this._isLoading$.next(this.loadingMap);
  }

}

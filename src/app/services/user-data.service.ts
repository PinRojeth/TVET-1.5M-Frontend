import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  // private UserDataSubject = new BehaviorSubject<Staff | null>(null);
  // public currentUserData = this.UserDataSubject.asObservable();

  constructor() {}
  changeUserData(userData: any): void {
    // this.UserDataSubject.next(userData);
  }
}

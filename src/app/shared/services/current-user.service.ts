import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable()
export class CurrentUserService {

  constructor() { }

  private currentUser$ = new Subject<any>();
  

  setCurrentUser(currentUser: any):void{
    // console.log("SET",currentUser)
    this.currentUser$.next(currentUser.data)
  }

  getCurrentUser$(): Observable<any>{
    return this.currentUser$.asObservable();
  }
}

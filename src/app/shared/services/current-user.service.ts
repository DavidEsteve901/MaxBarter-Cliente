import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class CurrentUserService {

  constructor() { }

  private currentUser$ = new BehaviorSubject<any>({userName:"HOLA"});
  

  setCurrentUser(currentUser: any):void{
    console.log("SET",currentUser)
    this.currentUser$.next(currentUser.data)
  }

  getCurrentUser$(): Observable<any>{
    return this.currentUser$.asObservable();
  }
}

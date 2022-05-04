import { Injectable, EventEmitter, Output} from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';
import { CurrentUserService } from 'src/app/shared/services/current-user.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';



@Injectable()
export class AuthService {

  private URL = environment.baseUrl;


  constructor(
    private http: HttpClient,
    private router:Router,
    private currentUserService:CurrentUserService
  ) { }

  
  getHola(){
    console.log("HOLAAA")
  }
  
  registrarse(user: any)  {
    return this.http.post(this.URL + 'auth/registro' , user);
  }

  login(user: any)  {
    return this.http.post(this.URL + 'auth/login' , user);
  }

  loggedIn(): boolean{
    //La !! devuelve true si existe y false si no
    return !!localStorage.getItem('token')
    
  }

  getToken(){
    return localStorage.getItem('token');
  }

  logout(){
    localStorage.removeItem('token');

    this.router.navigate(['/auth/login'])
  }

  setCurrentUser(){
    if(localStorage.getItem('token')){
      this.http.post(this.URL + 'auth/currentUser', {token: localStorage.getItem('token')}).subscribe(
        (resp:any) =>{
          this.currentUserService.setCurrentUser(resp)
        }
      )
    }
    
  }

  getCurrentUser(){
    return this.http.post(this.URL + 'auth/currentUser', {token: localStorage.getItem('token')});
  }


}

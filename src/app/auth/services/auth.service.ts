import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';
@Injectable()
export class AuthService {

  private URL = environment.baseUrl;

  constructor(
    private http: HttpClient,
    private router:Router
    ) { }

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
}

import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http'

@Injectable()
export class AuthService {

  private URL = environment.baseUrl;

  constructor(private http: HttpClient) { }

  registrarse(user: any)  {
    return this.http.post(this.URL + 'auth/registro' , user);
  }

  login(user: any)  {
    return this.http.post(this.URL + 'auth/login' , user);
  }

}

import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http'

@Injectable()
export class GeneralService {

  private URL = environment.baseUrl;

  

  constructor(
    private http: HttpClient,
    ) { }



  getProductos()  {
    return this.http.get(this.URL + 'productos/' );
  }

  getUserById(userName:string){
    return this.http.get(this.URL + `user/${userName}` );
  }
}

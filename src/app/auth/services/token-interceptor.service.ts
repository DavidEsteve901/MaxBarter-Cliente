import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(
    private authService: AuthService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //Con esto añado una cabecera por cada petición para no hacerlo manual, añadiendo al token el standard Bearer
    const tokenizeReq =  req.clone({
      setHeaders:{
        Authorization: `Bearer ${this.authService.getToken()}`
      }
    })

    return next.handle(tokenizeReq)
  }
  
}

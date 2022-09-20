import { Observable } from 'rxjs/internal/Observable';
import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService  {

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ) : Observable<HttpEvent<any>> {
    const token = localStorage.getItem('authToken');

    if(token) {
      req = req.clone({
        setHeaders: {Authorization: `Bearer ${token}`},
      });
    }

    console.log(token)
    return next.handle(req);
  }
}

import { AuthorizationService } from 'src/app/services/authorization.service';
import { Observable } from 'rxjs/internal/Observable';
import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, subscribeOn, switchMap, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { helper } from 'echarts';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService  {

  constructor(
    private readonly authorizationService: AuthorizationService
  ) {}

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

    return next.handle(req)
      .pipe(
        catchError(errData => {

          if(errData.status == 401) {
            let helper = new JwtHelperService();
            let id = helper.decodeToken(token!).Id;
  
            this.authorizationService.refreshToken(id)
              .subscribe({
                next: res => {
                  console.log(res);   
                  console.log('handle test');
                }
              });        
          }
          return throwError(errData);
        })
      )
  }

  // private handleRefreshToken(req: HttpRequest<any>, next: HttpHandler, id: number) {   
  //   this.authorizationService.refreshToken(id)
  //     .subscribe({
  //       next: res => {
  //         console.log(res);   
  //         console.log('handle test');
  //         return next.handle(req);
  //       },
  //       error: err => {
  //         console.log(err);
  //         return next.handle(req);
  //       }
  //     });
  // }

  private AddTokenHeader(req: HttpRequest<any>, token: any) {
    return req.clone({ headers: req.headers.set('authToken', `bearer ${token}`) });
  }
}

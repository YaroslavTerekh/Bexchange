import { Router } from '@angular/router';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { Observable } from 'rxjs/internal/Observable';
import { HttpEvent, HttpHandler, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, subscribeOn, throwError } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { helper } from 'echarts';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService {

  constructor(
    private readonly authorizationService: AuthorizationService,
    private readonly router: Router
  ) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('authToken');

    if (token) {
      req = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      });
    }

    return next.handle(req)
      .pipe(
        catchError(errData => {
          let accessToken = localStorage.getItem('authToken');
          let refreshToken = localStorage.getItem('refreshToken');

          if (errData.status == 401) {
            let helper = new JwtHelperService();
            let id = helper.decodeToken(accessToken!).Id;

            if (accessToken && refreshToken) {
              return this.authorizationService.refreshToken(id, refreshToken).pipe(
                switchMap(v => {
                    localStorage.setItem('authToken', v.token);
                    localStorage.setItem('refreshToken', v.refreshToken.token);
                    localStorage.setItem('loggedUserRole', this.authorizationService.getUserRole(v.token).toString());
                    this.authorizationService.setLoggedIn();
                    
                    console.log(req.clone({
                      setHeaders: { Authorization: `Bearer ${localStorage.getItem('authToken')}`, 'Content-Type': 'application/json' },
                    }));

                    return next.handle(req.clone({
                      setHeaders: { Authorization: `Bearer ${localStorage.getItem('authToken')}`, 'Content-Type': 'application/json' },
                    }));
                })
              );
            }
          }
          return next.handle(req);
        })
      )
  }
}

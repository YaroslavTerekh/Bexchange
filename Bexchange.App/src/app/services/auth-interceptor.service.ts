import { Router } from '@angular/router';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { Observable } from 'rxjs/internal/Observable';
import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { finalize, switchMap, tap } from 'rxjs/operators';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService {

  private totalRequests = 0;

  constructor(
    private readonly authorizationService: AuthorizationService,
    private readonly router: Router,
    private loadingService: LoaderService
  ) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('authToken');
    this.totalRequests++;
    this.loadingService.setLoading(true);

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
          let id = this.authorizationService.getUserId();
          if (errData.status == 401) {

            if (accessToken && refreshToken && id) {
              return this.authorizationService.refreshToken(id, refreshToken).pipe(
                switchMap(v => {
                    localStorage.setItem('authToken', v.token);
                    localStorage.setItem('refreshToken', v.refreshToken.token);
                    localStorage.setItem('loggedUserRole', v.role);
                    this.authorizationService.setLoggedIn();  
                                        
                    return next.handle(req.clone({
                      setHeaders: { Authorization: `Bearer ${localStorage.getItem('authToken')}`},
                    }));
                })
              );
            } else {
              this.router.navigate(['/error', {error: JSON.stringify(errData)}]);
            }
          } else {
            this.router.navigate(['/error', {error: JSON.stringify(errData)}]);
          }
          return next.handle(req);
        }),
        finalize(() => {
          this.totalRequests--;
          if (this.totalRequests == 0) {
            this.loadingService.setLoading(false);
          }
        })
      )      
  }
}

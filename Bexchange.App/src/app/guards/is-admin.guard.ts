import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IsAdminGuard implements CanActivate {
  constructor(
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    let helper = new JwtHelperService();

    let token = localStorage.getItem('authToken');

    if (token && !helper.isTokenExpired(token)) {
      let decodeToken = helper.decodeToken(token);

      if (decodeToken.Role == 'Admin' || decodeToken.Role == 'SuperAdmin') {
        return true;
      }

      this.router.navigate(['']);
      return false;      
    }

    this.router.navigate(['']);
    return false;
  }
  
  
}

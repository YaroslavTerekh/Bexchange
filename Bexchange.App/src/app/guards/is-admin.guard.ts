import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IsAdminGuard implements CanActivate {
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
      return false;
    }
    return false;
  }
  
}

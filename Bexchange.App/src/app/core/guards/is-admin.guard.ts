import { AuthorizationService } from 'src/app/core/services/authorization.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IsAdminGuard implements CanActivate {
  constructor(
    private router: Router,
    private readonly authorizationService: AuthorizationService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authorizationService.checkAuthorized()) {

      if (this.authorizationService.checkAdmin()) {
        return true;
      }

      this.router.navigate(['']);
      return false;      
    }

    this.router.navigate(['']);
    return false;
  }
  
  
}

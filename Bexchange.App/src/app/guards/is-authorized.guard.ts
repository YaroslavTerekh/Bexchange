import { AuthorizationService } from 'src/app/services/authorization.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IsAuthorizedGuard implements CanActivate {
  constructor(
    private readonly authorizationService: AuthorizationService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    if(this.authorizationService.checkAuthorized()) {
      return true;
    }
      
    return false;
  }
  
}

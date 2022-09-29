import { LoginRequest } from './models/LoginRequest';
import { environment } from './../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor(private http: HttpClient) {
    
  }

  public isLogged(): boolean {
    return localStorage.getItem('token') ? true : false; 
  }
  
  public loginUser(model: LoginRequest, method: string): Observable<any> {
    return this.http.post(`${environment.bexchangeApi}User/login/${method}`, model, {
      responseType: "text",
    })
  }

  helper = new JwtHelperService();

  public isAuthorized(): boolean {
    let token = localStorage.getItem('authToken');
    
    if(token) {      
      return !this.helper.isTokenExpired(token);
    }
    return false;
  }

  public isAdmin(): boolean {
    let token = localStorage.getItem('authToken');

    if(token) {
      let decodeToken = this.helper.decodeToken(token);
      
      if(decodeToken.Role == 'Admin' || decodeToken.Role == 'SuperAdmin') {
        return true;
      }
      return false;
    }
    return false;
  }

  public getUserId(): number {
    let token = localStorage.getItem('authToken');

    if(token) {
      let decodeToken = this.helper.decodeToken(token);

      return decodeToken.Id;
    }

    return 0;
  }

  public exit():void {
    console.log('removed');
    localStorage.removeItem('authToken');
  }

  
}

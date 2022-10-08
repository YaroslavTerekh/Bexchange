import { User } from './../models/User';

import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { ChangeUserInfoRequest } from '../models/ChangeUserInfoRequest';
import { LoginRequest } from '../models/LoginRequest';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  private _loggedRole!: number;
  isAuthorized!: boolean;
  helper = new JwtHelperService();
  authorizationSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.checkAuthorized());
  isAdminSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.checkAdmin());

  constructor(private http: HttpClient) {

  }

  public setLoggedIn() {
    this.authorizationSubject.next(true);
    this.isAdminSubject.next(this.checkAdmin());
  }

  public setLoggedOut() {
    if (localStorage.getItem('authToken')) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('loggedUserRole');
      this.authorizationSubject.next(false);
    }
  }

  public isLogged(): boolean {
    return localStorage.getItem('token') ? true : false;
  }

  public getUserInfo(id: number): Observable<User> {
    return this.http.get<User>(`${environment.bexchangeApi}User/id/${id}`);
  }

  public changeUserInfo(user: ChangeUserInfoRequest): Observable<object> {
    return this.http.post(`${environment.bexchangeApi}User/modify`, user);
  }

  public loginUser(model: LoginRequest, method: string): Observable<any> {
    return this.http.post(`${environment.bexchangeApi}User/login/${method}`, model, {
      responseType: "text",
    })
  }  

  public checkAuthorized(): boolean {
    let token = localStorage.getItem('authToken');

    if (token) {
      return !this.helper.isTokenExpired(token);
    }
    return false;
  }

  public checkAdmin(): boolean {
    let token = localStorage.getItem('authToken');

    if (token) {
      let decodeToken = this.helper.decodeToken(token);

      if (decodeToken.Role == 'Admin' || decodeToken.Role == 'SuperAdmin') {
        return true;
      }
      return false;
    }
    return false;
  }

  public getUserId(): number {
    let token = localStorage.getItem('authToken');

    if (token) {
      let decodeToken = this.helper.decodeToken(token);

      return decodeToken.Id;
    }

    return 0;
  }

  public getUserRole(token: string): string {
    console.log(token);

    if (token) {
      return this.helper.decodeToken(token).Role;
    }

    return 'user';
  }

  public exit(): void {

  }


}

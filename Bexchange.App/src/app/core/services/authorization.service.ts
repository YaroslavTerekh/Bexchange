import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { BehaviorSubject, Observable } from "rxjs";
import { ChangeUserInfoRequest } from "src/app/modules/user/models/ChangeUserInfoRequest";
import { LoginRequest } from "src/app/modules/user/models/LoginRequest";
import { Roles } from "src/app/shared/models/Roles";
import { User } from "src/app/shared/models/User";
import { environment } from "src/environments/environment";


@UntilDestroy()
@Injectable({
  providedIn: 'root'
})
export class AuthorizationService implements OnInit {  
  authorizationSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.checkAuthorized());
  isAdminSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.checkAdmin());
  isAuthorized!: boolean;
  helper = new JwtHelperService();
  private _user: User | null = null;

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
  }

  public setLoggedIn() {
    this.authorizationSubject$.next(true);
    if (localStorage.getItem('loggedUserRole') != 'User') {
      this.isAdminSubject$.next(true);
    }
  }

  public setLoggedOut() {
    if (localStorage.getItem('authToken')) {
      this.authorizationSubject$.next(false);
      this.isAdminSubject$.next(false);
      this.router.navigate(['']);
      this.logOut();
    }
  }

  public logIn(tokenJSON: any) {
    let token = JSON.parse(tokenJSON);
    localStorage.setItem('userId', token.id);
    localStorage.setItem('authToken', token.token);
    localStorage.setItem('refreshToken', token.refreshToken.token);

    this.getUserInfo(token.id)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: res => {
          this._user = res;
          localStorage.setItem('loggedUserRole', Roles[this._user?.role]);

          this.setLoggedIn();
        }
      });
  }

  public logOut() {
    this._user = null;
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('loggedUserRole');
    localStorage.removeItem('userId');
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

  public refreshToken(id: number, refreshToken: string): Observable<any> {
    return this.http.post<any>(`${environment.bexchangeApi}User/refresh-token`, { RefreshToken: refreshToken, userId: id });
  }

  public checkAuthorized(): boolean {
    let token = localStorage.getItem('authToken');

    if (token) {
      return !this.helper.isTokenExpired(token);
    }
    return false;
  }

  public checkAdmin(): boolean {
    let role = localStorage.getItem('loggedUserRole')

    if (this.checkAuthorized()) {
      if (role == "Admin" || role == "SuperAdmin") {
        return true;
      }
      return false;
    }
    return false;
  }

  public getUserId(): number {
    let id = localStorage.getItem('userId');

    if (id) {
      return parseInt(id);
    }

    return 0;
  }

  public getUserRole(): string {
    let role = localStorage.getItem('loggedUserRole')

    if (role) {
      return Roles[parseInt(role)].toString();
    }

    return '';
  }
}

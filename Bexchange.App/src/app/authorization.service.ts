import { LoginRequest } from './models/LoginRequest';
import { environment } from './../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor(private http: HttpClient) {
    
  }

  public loginName(user: LoginRequest) : Observable<string> {    
    let resp = this.http.post(environment.bexchangeApi + 'User/login/name', user, {
      responseType: "text",
    });
    console.log(resp);
    return resp;
  }

  public loginUser(model: LoginRequest): Observable<any> {
    return this.http.post(`${environment.bexchangeApi}User/login/name`, model, {
      responseType: "text",
    })
  }

  
}

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

  public isLogged(): boolean {
    return localStorage.getItem('token') ? true : false; 
  }
  
  public loginUser(model: LoginRequest, method: string): Observable<any> {
    return this.http.post(`${environment.bexchangeApi}User/login/${method}`, model, {
      responseType: "text",
    })
  }

  
}

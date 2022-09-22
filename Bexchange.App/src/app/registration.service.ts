import { environment } from './../environments/environment.prod';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { RegisterRequest } from './models/RegisterRequest';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http: HttpClient) { }

  public register(model: RegisterRequest) : Observable<any> {
    return this.http.post(`${environment.bexchangeApi}User/register`, model, {
      responseType: "text",
    });
  }
}

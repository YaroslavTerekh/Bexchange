import { User } from './../models/User';
import { environment } from './../../environments/environment.prod';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

  constructor(
    private http: HttpClient, 
    private router: Router
  ) { }

  getLastUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.bexchangeApi}Admin/users/last`);
  }
}

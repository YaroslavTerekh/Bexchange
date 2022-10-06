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
    private http: HttpClient
  ) { }

  getLastUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.bexchangeApi}Admin/users/last`);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.bexchangeApi}Admin/users`);
  }

  banUser(id: number): Observable<string> {
    return this.http.patch<string>(`${environment.bexchangeApi}Admin/ban/${id}`, null);
  }

  unbanUser(id: number): Observable<string> {
    return this.http.patch<string>(`${environment.bexchangeApi}Admin/unban/${id}`, null);
  }

  changeUserRole(role: number, id: number): Observable<string> {
    return this.http.patch<string>(`${environment.bexchangeApi}Admin/role/${id}/${role}`, null);
  }
}

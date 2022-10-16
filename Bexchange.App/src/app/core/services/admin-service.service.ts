import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "src/app/shared/models/User";
import { environment } from "src/environments/environment";


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

  getAdmins(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.bexchangeApi}Admin/admins`);
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

import { Observable } from 'rxjs/internal/Observable';
import { environment } from './../environments/environment';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AllDataService implements OnInit {

  constructor(private http: HttpClient, private router: Router) {
  }

  ngOnInit(): void {
      
      
  }

  public getAllOrders(): Observable<object> {
    return this.http.get(`${environment.bexchangeApi}Order`);
  }

  public deleteOrder(id: number): Observable<object> {
    return this.http.delete(`${environment.bexchangeApi}Order/delete/${id}`)
  }

  public acceptOrder(id: number): Observable<object> {
    return this.http.patch(`${environment.bexchangeApi}Order/state/accept/${id}`, null)
  }

  public declineOrder(id: number): Observable<object> {
    return this.http.patch(`${environment.bexchangeApi}Order/state/decline/${id}`, null);
  }
}

import { Order } from './models/Order';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from './../environments/environment';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AllDataService implements OnInit {

  constructor(private http: HttpClient, private router: Router) {
  }

  ngOnInit(): void {
  }

  // Authorization

  helper = new JwtHelperService();

  public isAuthorized(): boolean {
    let token = localStorage.getItem('authToken');
    
    if(token) {      
      return !this.helper.isTokenExpired(token);
    }
    return false;
  }

  public exit():void {
    console.log('removed');
    localStorage.removeItem('authToken');
    
    
  }

  // get - all
  public getAllBooks(): Observable<object> {
    return this.http.get(`${environment.bexchangeApi}Book`);
  }

  public getBook(id: number): Observable<object> {
    return this.http.get(`${environment.bexchangeApi}Book/${id}`);
  }

  public getAllOrders(): Observable<object> {
    return this.http.get(`${environment.bexchangeApi}Order`);
  }

  // logic - orders

  public deleteOrder(id: number): Observable<object> {
    return this.http.delete(`${environment.bexchangeApi}Order/delete/${id}`)
  }

  public acceptOrder(id: number): Observable<object> {
    return this.http.patch(`${environment.bexchangeApi}Order/state/accept/${id}`, null)
  }

  public declineOrder(id: number): Observable<object> {
    return this.http.patch(`${environment.bexchangeApi}Order/state/decline/${id}`, null);
  }

  public addOrder(order: Order): Observable<object> {
    return this.http.post(`${environment.bexchangeApi}Order/add`, order);
  }
}

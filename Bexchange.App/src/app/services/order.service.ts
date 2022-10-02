import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Order } from '../models/Order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private http: HttpClient
  ) { }

  //get - orders

  public getAllOrders(): Observable<Order> {
    return this.http.get<Order>(`${environment.bexchangeApi}Order`);
  }

  public getUserOrders(id: number): Observable<Order> {
    return this.http.get<Order>(`${environment.bexchangeApi}Order/user/${id}`);
  }

  public getUserIncomingOrders(id: number): Observable<Order> {
    return this.http.get<Order>(`${environment.bexchangeApi}Order/user/${id}/incoming`);
  }

  public getUserOutgoingOrders(id: number): Observable<Order> {
    return this.http.get<Order>(`${environment.bexchangeApi}Order/user/${id}/outgoing`);
  }

  // logic - orders

  public deleteOrder(id: number): Observable<object> {
    return this.http.delete(`${environment.bexchangeApi}Order/delete/${id}`);
  }

  public acceptOrder(id: number): Observable<object> {
    return this.http.patch(`${environment.bexchangeApi}Order/state/accept/${id}`, null);
  }

  public declineOrder(id: number): Observable<object> {
    return this.http.patch(`${environment.bexchangeApi}Order/state/decline/${id}`, null);
  }

  public addOrder(order: Order): Observable<object> {
    return this.http.post(`${environment.bexchangeApi}Order/add`, order);
  }
}

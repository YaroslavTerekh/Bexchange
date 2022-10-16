import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { OrderRequest } from "src/app/modules/user/models/OrderRequest";
import { Order } from "src/app/shared/models/Order";
import { environment } from "src/environments/environment";


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private http: HttpClient
  ) { }

  //get - orders

  public getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${environment.bexchangeApi}Order`);
  }

  public getUserOrders(id: number): Observable<Order[]> {
    return this.http.get<Order[]>(`${environment.bexchangeApi}Order/user/${id}`);
  }

  public getUserIncomingOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${environment.bexchangeApi}Order/user/incoming`);
  }

  public getUserOutgoingOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${environment.bexchangeApi}Order/user/outgoing`);
  }

  public getUserSuccededOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${environment.bexchangeApi}Order/user/succeded`);
  }

  // logic - orders

  public deleteOrder(id: number): Observable<object> {
    return this.http.delete(`${environment.bexchangeApi}Order/delete/${id}`);
  }

  public acceptOrder(id: number): Observable<object> {
    return this.http.patch(`${environment.bexchangeApi}Order/state/accept/${id}`, null);
  }

  public successOrder(id: number): Observable<string> {
    return this.http.patch<string>(`${environment.bexchangeApi}Order/success/${id}`, null);
  }

  public declineOrder(id: number): Observable<object> {
    return this.http.patch(`${environment.bexchangeApi}Order/state/decline/${id}`, null);
  }

  public addOrder(order: OrderRequest): Observable<object> {
    return this.http.post(`${environment.bexchangeApi}Order/add`, order);
  }
}

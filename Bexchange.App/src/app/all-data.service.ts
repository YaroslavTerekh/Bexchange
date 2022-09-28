import { ChangeUserInfoRequest } from './models/ChangeUserInfoRequest';
import { Order } from './models/Order';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from './../environments/environment';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CommentRequest } from './models/CommentRequest';

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

  public isAdmin(): boolean {
    let token = localStorage.getItem('authToken');

    if(token) {
      let decodeToken = this.helper.decodeToken(token);
      
      if(decodeToken.Role == 'Admin' || decodeToken.Role == 'SuperAdmin') {
        return true;
      }
      return false;
    }
    return false;
  }

  public getUserId(): number {
    let token = localStorage.getItem('authToken');

    if(token) {
      let decodeToken = this.helper.decodeToken(token);

      return decodeToken.Id;
    }

    return 0;
  }

  public exit():void {
    console.log('removed');
    localStorage.removeItem('authToken');
  }

  // get - books
  public getBooks(id: number): Observable<object> {
    return this.http.get(`${environment.bexchangeApi}Book/user/ignore/${id}`);
  }

  public getAllBooks(): Observable<object> {
    return this.http.get(`${environment.bexchangeApi}Book`);
  }

  public getBook(id: number): Observable<object> {
    return this.http.get(`${environment.bexchangeApi}Book/${id}`);
  }

  public getUserBooks(id: number): Observable<object> {
    return this.http.get(`${environment.bexchangeApi}Book/user/${id}`);
  }

  public getBooksByGenre(title: string): Observable<object> {
    return this.http.get(`${environment.bexchangeApi}Book/genre/${title}`);
  }

  public getBooksByAuthor(name: string): Observable<object> {
    return this.http.get(`${environment.bexchangeApi}Book/author/${name}`);
  }

  // post - books 

  public AddComment(id: number, message: CommentRequest): Observable<object> {
    return this.http.patch(`${environment.bexchangeApi}Book/${id}/comments/add`, message);
  }

  //get - orders

  public getAllOrders(): Observable<object> {
    return this.http.get(`${environment.bexchangeApi}Order`);
  }

  public getUserOrders(id: number): Observable<object> {
    return this.http.get(`${environment.bexchangeApi}Order/user/${id}`);
  }

  public getUserIncomingOrders(id: number): Observable<object> {
    return this.http.get(`${environment.bexchangeApi}Order/user/${id}/incoming`);
  }

  public getUserOutgoingOrders(id: number): Observable<object> {
    return this.http.get(`${environment.bexchangeApi}Order/user/${id}/outgoing`);
  }

  public getUserInfo(id: number): Observable<object> {
    return this.http.get(`${environment.bexchangeApi}User/id/${id}`);
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

  // logic - users

  public changeUserInfo(user: ChangeUserInfoRequest): Observable<object> {
    return this.http.post(`${environment.bexchangeApi}User/modify`, user);
  }
}

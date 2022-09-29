import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from './models/Book';
import { environment } from 'src/environments/environment';
import { CommentRequest } from './models/CommentRequest';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(
    private http: HttpClient
  ) { }

  
  // get - books
  public getBooks(id: number): Observable<Book> {
    return this.http.get<Book>(`${environment.bexchangeApi}Book/user/ignore/${id}`);
  }

  public getAllBooks(): Observable<Book> {
    return this.http.get<Book>(`${environment.bexchangeApi}Book`);
  }

  public getBook(id: number): Observable<Book> {
    return this.http.get<Book>(`${environment.bexchangeApi}Book/${id}`);
  }

  public getUserBooks(id: number): Observable<Book> {
    return this.http.get<Book>(`${environment.bexchangeApi}Book/user/${id}`);
  }

  public getBooksByGenre(title: string): Observable<Book> {
    return this.http.get<Book>(`${environment.bexchangeApi}Book/genre/${title}`);
  }

  public getBooksByAuthor(name: string): Observable<Book> {
    return this.http.get<Book>(`${environment.bexchangeApi}Book/author/${name}`);
  }

  public getFirstBooks(amount: number): Observable<Book[]> {
    return this.http.get<Book[]>(`${environment.bexchangeApi}Book/main-page/${amount}`);
  }

  // post - books 

  public AddComment(id: number, message: CommentRequest): Observable<string> {
    return this.http.patch<string>(`${environment.bexchangeApi}Book/${id}/comments/add`, message);
  }
}

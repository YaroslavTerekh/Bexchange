import { Author } from './models/Author';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from './models/Book';
import { environment } from 'src/environments/environment';
import { CommentRequest } from './models/CommentRequest';
import { Genre } from './models/Genre';

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

  public getUserBooks(id: number): Observable<Book[]> {
    return this.http.get<Book[]>(`${environment.bexchangeApi}Book/user/${id}`);
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

  public getImage(id: number | undefined | null): Observable<any> {
    return this.http.get(`${environment.bexchangeApi}Book/image/${id}`);

  }

  // get - genres

  public getAllGenres(): Observable<Genre[]> {
    return this.http.get<Genre[]>(`${environment.bexchangeApi}Book/genres`);
  }

  // get - authors

  public getAllAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(`${environment.bexchangeApi}Book/authors`);
  }

  // post - books 

  public AddComment(id: number, message: CommentRequest): Observable<string> {
    return this.http.patch<string>(`${environment.bexchangeApi}Book/${id}/comments/add`, message);
  }

  public AddBook(data: any, img: string): Observable<string> {
    return this.http.post<string>(`${environment.bexchangeApi}Book/add/book/${img}`, data);
  }

  public AddImage(data: any): Observable<string> {
    return this.http.post<string>(`${environment.bexchangeApi}Book/add/image`, data);
  }
}

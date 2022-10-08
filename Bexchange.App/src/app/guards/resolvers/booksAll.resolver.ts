import { Injectable } from "@angular/core";
import { Resolve, ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { Book } from "src/app/models/Book";
import { BookService } from "src/app/services/book.service";

@Injectable({
    providedIn: 'root'
  })
  export class BookAllResolver implements Resolve<Book[]> {
  
    constructor(
        private bookService: BookService,
      ) { }
    
    resolve(): Observable<Book[]> {
      return this.bookService.getAllBooks();
    }
  }
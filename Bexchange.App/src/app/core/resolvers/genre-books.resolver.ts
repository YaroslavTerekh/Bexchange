import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { Book } from "src/app/shared/models/Book";
import { BookService } from "src/app/core/services/book.service";

@Injectable({
    providedIn: 'root'
  })
  export class GenreBookResolver implements Resolve<Book[]> {
    constructor(
        private bookService: BookService,
      ) { }
    
    resolve(route: ActivatedRouteSnapshot): Observable<Book[]> {
      return this.bookService.getBooksByGenre(route.params['genre']);
    }
  }
import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { Book } from "src/app/models/Book";
import { BookService } from "src/app/services/book.service";

@Injectable({
    providedIn: 'root'
  })
  export class UserBookResolver implements Resolve<Book[]> {
    constructor(
        private bookService: BookService,
        private route: ActivatedRoute
      ) { }
    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Book[]> {
      return this.bookService.getUserBooks(+route.params['id']);
    }
  }
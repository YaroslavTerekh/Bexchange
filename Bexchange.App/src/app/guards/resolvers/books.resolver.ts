import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { Book } from "src/app/models/Book";
import { AuthorizationService } from "src/app/services/authorization.service";
import { BookService } from "src/app/services/book.service";

@Injectable({
    providedIn: 'root'
  })
  export class BookResolver implements Resolve<Book[]> {
  
    constructor(
        private bookService: BookService,
        private authorizationService: AuthorizationService,
        private route: ActivatedRoute
      ) { }
    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Book[]> {
      return this.bookService.getBooks(this.authorizationService.getUserId());
    }
  }
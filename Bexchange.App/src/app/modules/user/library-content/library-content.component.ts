import { Component, OnInit, AfterViewInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { BookService } from "src/app/services/book.service";
import { Book } from "src/app/models/Book";
import { AuthorizationService } from "src/app/services/authorization.service";


@UntilDestroy()
@Component({
  selector: 'app-library-content',
  templateUrl: './library-content.component.html',
  styleUrls: ['./library-content.component.scss']
})
export class LibraryContentComponent implements OnInit, AfterViewInit {
  // bookEmit!: Array<Book>;
  // bookList!: Book[];
  books: Book[] = [];
  // id: number | undefined;
  // genre: string | undefined;
  // author: string | undefined;

  constructor(
    // private bookService: BookService,
    // private authorizationService: AuthorizationService,
    // private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // this.id = this.route.snapshot.params['id'];
    // this.genre = this.route.snapshot.params['genre'];
    // this.author = this.route.snapshot.params['author'];
  }

  ngAfterViewInit(): void {
    this.books = this.route.snapshot.data['books'];
  }
}

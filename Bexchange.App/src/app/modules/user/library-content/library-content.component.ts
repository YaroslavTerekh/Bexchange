import { debounceTime } from 'rxjs';
import { BookService } from 'src/app/services/book.service';
import { Component, AfterViewInit, Output } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Book } from "src/app/models/Book";

@Component({
  selector: 'app-library-content',
  templateUrl: './library-content.component.html',
  styleUrls: ['./library-content.component.scss']
})
export class LibraryContentComponent implements AfterViewInit {
  books: Book[] = [];
  @Output() newBooks: Book[] = [];
  
  constructor(
    private route: ActivatedRoute,
    private readonly bookService: BookService
  ) { }

  ngAfterViewInit(): void {
    this.books = this.route.snapshot.data['books'];

    this.bookService.bookSearchSubject
      .subscribe({
        next: res => {
          this.books = res;
        }
      });
  }
}

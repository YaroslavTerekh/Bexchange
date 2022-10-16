import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { BookService } from "src/app/core/services/book.service";
import { Book } from "src/app/shared/models/Book";

@UntilDestroy()
@Component({
  selector: 'app-book-content-owner-functions',
  templateUrl: './book-content-owner-functions.component.html',
  styleUrls: ['./book-content-owner-functions.component.scss']
})
export class BookContentOwnerFunctionsComponent implements OnInit {
  @Input()book!: Book;
  @Output()comments = new EventEmitter<void>();
  
  constructor(
    private bookService: BookService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
  }

  deleteBook(): void {
    this.bookService.deleteBook(this.book.id)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: res => {
          this.router.navigate(['']);
        }
      })
  }

}

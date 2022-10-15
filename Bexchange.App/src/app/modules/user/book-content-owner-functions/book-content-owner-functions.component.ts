import { Router } from '@angular/router';
import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { BookService } from "src/app/services/book.service";
import { Book } from "src/app/models/Book";


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

  deleteBook() {
    this.bookService.deleteBook(this.book.id)
      .subscribe({
        next: res => {
          this.router.navigate(['']);
        }
      })
  }

}

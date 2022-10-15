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
    private bookService: BookService
  ) { }

  ngOnInit(): void {
  }

  deleteBook() {
    this.bookService.deleteBook(this.book.id)
      .subscribe(res => {
        console.log(res);        
      })
  }

}
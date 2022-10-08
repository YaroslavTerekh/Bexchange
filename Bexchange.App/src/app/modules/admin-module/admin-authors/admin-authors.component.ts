import { BookService } from 'src/app/services/book.service';
import { Component, OnInit } from '@angular/core';
import { Author } from 'src/app/models/Author';

@Component({
  selector: 'app-admin-authors',
  templateUrl: './admin-authors.component.html',
  styleUrls: ['./admin-authors.component.scss']
})
export class AdminAuthorsComponent implements OnInit {
  authors: Author[] = [];

  constructor(
    private readonly bookService: BookService
  ) { }

  ngOnInit(): void {
    this.bookService.getAllAuthors()
      .subscribe({
        next: res => {
          this.authors = res;
        }
      });
  }

}

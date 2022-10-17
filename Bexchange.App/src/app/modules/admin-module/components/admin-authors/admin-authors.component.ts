import { Component, OnInit } from "@angular/core";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { BookService } from "src/app/core/services/book.service";
import { Author } from "src/app/shared/models/Author";

@UntilDestroy()
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
      .pipe(untilDestroyed(this))
      .subscribe({
        next: res => {
          this.authors = res;
        }
      });
  }

}

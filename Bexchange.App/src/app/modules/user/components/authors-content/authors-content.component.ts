import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { BookService } from "src/app/core/services/book.service";
import { Author } from "src/app/shared/models/Author";

@UntilDestroy()
@Component({
  selector: 'app-authors-content',
  templateUrl: './authors-content.component.html',
  styleUrls: ['./authors-content.component.scss']
})
export class AuthorsContentComponent implements OnInit {
  authors: Author[] = [];

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router,
    private readonly bookService: BookService
    ) { }

  ngOnInit(): void {
    this.bookService.getVerifiedAuthors()
      .pipe(untilDestroyed(this))
      .subscribe({
        next: res => {
          this.authors = res;
        }
      });
  }

}

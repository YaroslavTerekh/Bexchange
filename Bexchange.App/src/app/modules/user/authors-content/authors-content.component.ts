import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { Author } from "src/app/models/Author";
import { BookService } from "src/app/services/book.service";


@UntilDestroy()
@Component({
  selector: 'app-authors-content',
  templateUrl: './authors-content.component.html',
  styleUrls: ['./authors-content.component.scss']
})
export class AuthorsContentComponent implements OnInit {

  authors: Author[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    private bookService: BookService
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

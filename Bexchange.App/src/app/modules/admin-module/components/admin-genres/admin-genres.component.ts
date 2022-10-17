import { Component, OnInit } from "@angular/core";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { BookService } from "src/app/core/services/book.service";
import { Genre } from "src/app/shared/models/Genre";

@UntilDestroy()
@Component({
  selector: 'app-admin-genres',
  templateUrl: './admin-genres.component.html',
  styleUrls: ['./admin-genres.component.scss']
})
export class AdminGenresComponent implements OnInit {
  genres: Genre[] = [];

  constructor(
    private readonly bookService: BookService,
  ) { }

  ngOnInit(): void {
    this.bookService.getAllGenres()
      .pipe(untilDestroyed(this))
      .subscribe({
        next: res => {
          this.genres = res;
        }
      });
  }

}

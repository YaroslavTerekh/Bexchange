import { untilDestroyed } from '@ngneat/until-destroy';
import { BookService } from 'src/app/services/book.service';
import { Component, OnInit } from '@angular/core';
import { Genre } from 'src/app/models/Genre';
import { UntilDestroy } from '@ngneat/until-destroy';

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

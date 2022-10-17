import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { BookService } from "src/app/core/services/book.service";
import { Genre } from "src/app/shared/models/Genre";

@UntilDestroy()
@Component({
  selector: 'app-genres-content',
  templateUrl: './genres-content.component.html',
  styleUrls: ['./genres-content.component.scss']
})
export class GenresContentComponent implements OnInit {  
  genres!: Genre[];

  constructor(
    private readonly bookService: BookService
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

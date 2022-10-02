import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { BookService } from "src/app/services/book.service";


@UntilDestroy()
@Component({
  selector: 'app-genres-content',
  templateUrl: './genres-content.component.html',
  styleUrls: ['./genres-content.component.scss']
})
export class GenresContentComponent implements OnInit {  
  genres: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private bookService: BookService
    ) { }

  ngOnInit(): void {
    this.bookService.getAllGenres()
      .pipe(untilDestroyed(this))
      .subscribe({
        next: res => {
          this.genres = res;          
        }, 
        error: (err: any) => {
          this.router.navigate(['/error', { error: JSON.stringify(err) }])
        }
      });
  }

}

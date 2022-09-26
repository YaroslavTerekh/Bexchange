import { ActivatedRoute, Router } from '@angular/router';
import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AllDataService } from '../all-data.service';
import { Book } from '../models/Book';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-library-content',
  templateUrl: './library-content.component.html',
  styleUrls: ['./library-content.component.scss']
})
export class LibraryContentComponent implements OnInit {
  bookEmit!: Array<Book>;
  bookList!: Book[];
  books!: any;
  id: number | undefined;
  genre: string | undefined;
  author: string | undefined;

  constructor(
    private dataService: AllDataService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.genre = this.route.snapshot.params['genre'];
    this.author = this.route.snapshot.params['author'];

    if (this.id == undefined || this.author == undefined || this.genre == undefined) {
      this.dataService.getBooks(this.dataService.getUserId())
        .pipe(untilDestroyed(this))
        .subscribe({
          next: res => {
            this.books = res;
          },
          error: (err: any) => {
            this.router.navigate(['/error', { error: JSON.stringify(err) }])
          }
        });
    }

    if (this.genre != undefined) {
      this.dataService.getBooksByGenre(this.genre)
        .pipe(untilDestroyed(this))
        .subscribe({
          next: res => {
            this.books = res;
          },
          error: (err: any) => {
            this.router.navigate(['/error', { error: JSON.stringify(err) }])
          }
        });
    }

    if (this.author != undefined) {
      this.dataService.getBooksByAuthor(this.author)
        .pipe(untilDestroyed(this))
        .subscribe({
          next: res => {
            this.books = res;
          },
          error: (err: any) => {
            this.router.navigate(['/error', { error: JSON.stringify(err) }])
          }
        });
    }

    if (this.id != undefined) {
      this.dataService.getUserBooks(this.id)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: res => {
          this.books = res;
        },
        error: (err: any) => {
          this.router.navigate(['/error', { error: JSON.stringify(err) }])
        }
      });
    }
  }

  ngOnDestroy(): void {

  }

}

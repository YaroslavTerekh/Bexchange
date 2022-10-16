import { BookService } from 'src/app/core/services/book.service';
import { Component, AfterViewInit, Output } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Book } from "src/app/shared/models/Book";
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-library-content',
  templateUrl: './library-content.component.html',
  styleUrls: ['./library-content.component.scss']
})
export class LibraryContentComponent implements AfterViewInit {
  @Output() newBooks: Book[] = [];
  books: Book[] = [];
  isAnyParam!: boolean;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly bookService: BookService
  ) { }

  ngAfterViewInit(): void {
    this.books = this.route.snapshot.data['books'];
    this.isAnyParam = this.paramCheck();

    if (!this.isAnyParam) {
      this.bookService.bookSearchSubject$
        .pipe(untilDestroyed(this))
        .subscribe({
          next: res => {
            this.books = res;
          }
        });
    }
  }

  private paramCheck(): boolean {
    let paramsArr = [];
    let param = this.route.snapshot.params['id'];
    paramsArr.push(param);
    param = this.route.snapshot.params['author'];
    paramsArr.push(param)
    param = this.route.snapshot.params['genre'];
    paramsArr.push(param)

    let result = false;

    paramsArr.forEach(p => {
      if (p != undefined) {
        result = true;
        return result;
      }
      return result;
    });

    return result;
  }
}

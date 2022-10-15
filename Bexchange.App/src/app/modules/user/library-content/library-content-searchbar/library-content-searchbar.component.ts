import { BookService } from 'src/app/services/book.service';
import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { debounceTime, tap } from 'rxjs/operators';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-library-content-searchbar',
  templateUrl: './library-content-searchbar.component.html',
  styleUrls: ['./library-content-searchbar.component.scss']
})
export class LibraryContentSearchbarComponent implements AfterViewInit {
  @ViewChild('input') input!: ElementRef;

  constructor(
    private readonly bookService: BookService
  ) { }

  ngAfterViewInit(): void {
    this.search('');

    fromEvent(this.input.nativeElement, 'keyup')
    .pipe(
      debounceTime(700),
      tap((text) => {
        this.search(this.input.nativeElement.value);
      })
    )
    .subscribe();
  }

  search(title: string) {
    this.bookService.searchBook(title)
      .subscribe({
        next: res => {
          this.bookService.bookSearchSubject.next(res);
        }
      });
  }

}

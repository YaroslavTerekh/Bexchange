import { Component, OnInit } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { BookService } from "src/app/services/book.service";
import { Book } from "src/app/models/Book";


@UntilDestroy()
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  books!: Book[];
  booksToShow: any[] = [];

  slideConfig = { 
    slidesToShow: 5, 
    slidesToScroll: 5, 
    dots: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  constructor(
    private bookService: BookService,
    private router: Router,
    private sanitizer: DomSanitizer
    ) {
   }

  ngOnInit(): void {
    this.bookService.getFirstBooks(10)
    .pipe(untilDestroyed(this))
    .subscribe({
      next: res => {        
        this.books = res;

        this.books.forEach(item => {
          this.bookService.getImage(item.image?.id)
            .pipe(untilDestroyed(this))
            .subscribe(res => {
              let obj = { book: item, img: this.sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,' + res.base64ImageRepresentation) }
              this.booksToShow.push(obj);
            })
        })
      },
      error: (err: any) => {
        this.router.navigate(['/error', { error: JSON.stringify(err) }]);
      }
    });
  }

}

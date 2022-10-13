import { AuthorizationService } from 'src/app/services/authorization.service';
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

  books: Book[] = [];
  booksToShow: any[] = [];
  imgTemp: any;
  isLoggedIn!: boolean;

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
    private readonly authorizationService: AuthorizationService
  ) {
  }

  ngOnInit(): void {
    this.authorizationService.authorizationSubject
      .subscribe({
        next: res => {
          this.isLoggedIn = res;
        }
      });

    this.bookService.getFirstBooks(10)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: res => {
          if (res.length > 0) {
            this.books = res;

            this.books.forEach(item => {
              this.bookService.getImage(item.image?.id)
                .pipe(untilDestroyed(this))
                .subscribe(res => {
                  let reader = new FileReader();
                  reader.addEventListener("load", () => {
                    let obj = { book: item, img: reader.result };
                    this.booksToShow.push(obj);
                  }, false);

                  if (res) {
                    reader.readAsDataURL(res);
                  }

                })
            })
          }
        },
        error: (err: any) => {
          this.router.navigate(['/error', { error: JSON.stringify(err) }]);
        }
      });
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.imgTemp = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }

}

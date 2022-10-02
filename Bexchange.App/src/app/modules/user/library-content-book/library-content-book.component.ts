import { Component, OnInit, Input } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { BookService } from "src/app/services/book.service";
import { Book } from "src/app/models/Book";

@UntilDestroy()
@Component({
  selector: 'app-library-content-book',
  templateUrl: './library-content-book.component.html',
  styleUrls: ['./library-content-book.component.scss']
})
export class LibraryContentBookComponent implements OnInit {

  @Input() book!: Book;
  img: any;

  constructor(
    private bookService: BookService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.bookService.getImage(this.book.image?.id)
      .pipe(untilDestroyed(this))
      .subscribe(res => {
        this.img = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,' + res.base64ImageRepresentation);
        console.log("THIS");
        console.log(this.img);
        console.log("THIS");
      })

  }

}

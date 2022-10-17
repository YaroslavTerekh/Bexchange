import { Component, OnInit, Input } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { BookService } from "src/app/core/services/book.service";
import { Book } from "src/app/shared/models/Book";

@UntilDestroy()
@Component({
  selector: 'app-library-content-book',
  templateUrl: './library-content-book.component.html',
  styleUrls: ['./library-content-book.component.scss']
})
export class LibraryContentBookComponent implements OnInit {

  @Input() book!: Book;
  img!: string | ArrayBuffer | null;

  constructor(
    private readonly bookService: BookService,
  ) { }

  ngOnInit(): void {
    this.bookService.getImage(this.book.image?.id)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: res => {
          this.createImageFromBlob(res)
        }
      });
  }

  createImageFromBlob(image: Blob): void {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.img = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }

}

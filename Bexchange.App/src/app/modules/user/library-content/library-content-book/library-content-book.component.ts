import { Component, OnInit, Input } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { BookService } from "src/app/services/book.service";
import { Book } from "src/app/models/Book";
import { map, tap } from "rxjs/operators";

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
    private readonly bookService: BookService,
    private readonly sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.bookService.getImage(this.book.image?.id)
    .subscribe({
      next: res => {
        this.createImageFromBlob(res)
      }
    });
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
       this.img = reader.result;
    }, false);
 
    if (image) {
       reader.readAsDataURL(image);
    }
 }

}
